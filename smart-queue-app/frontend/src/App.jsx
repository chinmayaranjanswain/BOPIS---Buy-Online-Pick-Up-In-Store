import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom'; // <--- Critical Import
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet /> {/* <--- This is where HomeScreen will appear */}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;