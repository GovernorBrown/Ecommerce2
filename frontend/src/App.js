import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen.js';
import ContactScreen from './screens/ContactScreen.js';

function App() {
  return (
  
    <Router>
    <Header />
    <main className='py-3'>
  <Container>
    <Routes>
      <Route path='/' element={<HomeScreen />} exact />
      <Route path='product/:id' element={<ProductScreen />} />
      <Route path='ContactScreen' element={<ContactScreen />} exact/>
    </Routes>
  </Container>
  </main>
  <Footer />
    </Router>
  
  );
}

export default App;
