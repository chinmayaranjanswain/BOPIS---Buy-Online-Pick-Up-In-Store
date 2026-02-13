import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/Homescreen';

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen /> {/* Show the screen here */}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;