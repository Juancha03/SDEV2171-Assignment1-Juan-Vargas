import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

const API_URL = "http://10.0.2.2:4000";

interface SleepDetails {
  bedTime?: string;
  wakeTime?: string;
}

export interface SleepEntry {
  id: number;
  userId: string;
  date: string;
  title: string;
  category: string;
  value: number;
  rating: number;
  notes?: string;
  details?: SleepDetails;
}

export interface NewSleepEntry {
  date: string;
  title: string;
  category: string;
  value: number;
  rating: number;
  notes?: string;
  details?: SleepDetails;
}

interface RequestResult {
  success: boolean;
  message: string;
}

interface EntriesContextType {
  entries: SleepEntry[];
  isLoading: boolean;
  errorMessage: string;
  fetchEntries: () => Promise<void>;
  createEntry: (entry: NewSleepEntry) => Promise<RequestResult>;
}

const EntriesContext = createContext<EntriesContextType | undefined>(
  undefined
);

export function EntriesProvider({ children }: { children: ReactNode }) {
  const { token, logout } = useAuth();
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchEntries() {
    if (!token) {
      setEntries([]);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/entries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        setEntries([]);
        logout();
        return;
      }

      if (!response.ok) {
        setErrorMessage(data.message || "Could not load sleep entries.");
        return;
      }

      setEntries(data.records);
    } catch {
      setErrorMessage("Could not connect to the backend.");
    } finally {
      setIsLoading(false);
    }
  }

  async function createEntry(entry: NewSleepEntry): Promise<RequestResult> {
    if (!token) {
      return {
        success: false,
        message: "You must log in before adding an entry.",
      };
    }

    try {
      const response = await fetch(`${API_URL}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
      });

      const data = await response.json();

      if (response.status === 401) {
        logout();

        return {
          success: false,
          message: "Your session has ended. Please log in again.",
        };
      }

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Could not create the sleep entry.",
        };
      }

      const createdEntry = data.record || data.entry;

      setEntries((currentEntries) => [
        createdEntry,
        ...currentEntries,
      ]);

      return {
        success: true,
        message: data.message || "Sleep entry created successfully.",
      };
    } catch {
      return {
        success: false,
        message: "Could not connect to the backend.",
      };
    }
  }

  useEffect(() => {
    if (token) {
      fetchEntries();
    } else {
      setEntries([]);
      setErrorMessage("");
      setIsLoading(false);
    }
  }, [token]);

  return (
    <EntriesContext.Provider
      value={{
        entries,
        isLoading,
        errorMessage,
        fetchEntries,
        createEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
}

export function useEntries() {
  const context = useContext(EntriesContext);

  if (!context) {
    throw new Error("useEntries must be used inside EntriesProvider.");
  }

  return context;
}