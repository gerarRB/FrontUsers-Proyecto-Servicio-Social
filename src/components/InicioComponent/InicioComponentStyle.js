import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 15, 
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardStatus: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  statusInProgress: {
    color: '#2ecc71',
  },
  statusCompleted: {
    color: '#7f8c8d',
  },
  cardDetail: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    flex: 1, 
    flexShrink: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    flexShrink: 1,
  },
  message: {
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 20,
  },
});
