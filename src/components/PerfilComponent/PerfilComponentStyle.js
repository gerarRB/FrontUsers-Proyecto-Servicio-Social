import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = width >= 768;

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: isWeb ? 40 : 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: isWeb ? 32 : 24,
    fontWeight: 'bold',
    marginBottom: isWeb ? 30 : 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: isWeb ? 30 : 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: isWeb ? '90%' : '90%',
    maxWidth: isWeb ? 800 : 500,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: isWeb ? 16 : 14,
    fontWeight: 'bold',
    color: '#555',
    width: isWeb ? 150 : 100,
  },
  value: {
    fontSize: isWeb ? 16 : 14,
    color: '#333',
    flex: 1,
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: isWeb ? 20 : 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: isWeb ? 300 : '100%',
    marginHorizontal: isWeb ? 'auto' : 0,
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: isWeb ? 15 : 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: isWeb ? 16 : 14,
    fontWeight: 'bold',
  },
});