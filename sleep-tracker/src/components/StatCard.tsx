import {StyleSheet, Text, View} from 'react-native';

interface StatCardProps {
    title: string;
    value: string;
}

export default function StatCard({title, value}: StatCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    title: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 10,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#172554',
    }
});
