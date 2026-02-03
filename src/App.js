import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { 
    font-family: 'Arial', sans-serif; 
    overflow-x: hidden;
    background: linear-gradient(45deg, #8B4513, #D2691E, #CD853F);
    background-size: 400% 400%;
    animation: gradientShift 3s ease infinite;
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  color: #fff;
  text-shadow: 3px 3px 0px #8B4513;
  margin-bottom: 2rem;
  text-align: center;
`;

const CoffeeMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
`;

const CoffeeCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const CoffeeEmoji = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const OrderButton = styled(motion.button)`
  background: linear-gradient(45deg, #FF6B35, #F7931E);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;

const FloatingBeans = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  color: #8B4513;
  pointer-events: none;
`;

function App() {
  const [orders, setOrders] = useState(0);
  const [beans, setBeans] = useState([]);

  const coffees = [
    { name: "Espresso Explosion", emoji: "☕", price: "$4.99", description: "Pure energy in a cup!" },
    { name: "Latte Lightning", emoji: "🥛", price: "$5.99", description: "Smooth as silk, fast as light!" },
    { name: "Cappuccino Chaos", emoji: "☕", price: "$5.49", description: "Foamy madness awaits!" },
    { name: "Mocha Mayhem", emoji: "🍫", price: "$6.99", description: "Chocolate coffee craziness!" }
  ];

  const createFloatingBean = () => {
    const newBean = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50
    };
    setBeans(prev => [...prev, newBean]);
    
    setTimeout(() => {
      setBeans(prev => prev.filter(bean => bean.id !== newBean.id));
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(createFloatingBean, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOrder = (coffee) => {
    setOrders(prev => prev + 1);
    createFloatingBean();
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <AnimatePresence>
          {beans.map(bean => (
            <FloatingBeans
              key={bean.id}
              initial={{ x: bean.x, y: bean.y, opacity: 1, rotate: 0 }}
              animate={{ 
                y: -100, 
                opacity: 0, 
                rotate: 360,
                x: bean.x + (Math.random() - 0.5) * 200 
              }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              ☕
            </FloatingBeans>
          ))}
        </AnimatePresence>

        <Title
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6 }}
        >
          ☕ CRAZY COFFEE SHOP ☕
        </Title>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>
            Orders Today: {orders} 🎉
          </h2>
        </motion.div>

        <CoffeeMenu>
          {coffees.map((coffee, index) => (
            <CoffeeCard
              key={coffee.name}
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <CoffeeEmoji>{coffee.emoji}</CoffeeEmoji>
              <h3 style={{ color: '#8B4513', marginBottom: '0.5rem' }}>{coffee.name}</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>{coffee.description}</p>
              <h4 style={{ color: '#FF6B35', fontSize: '1.5rem' }}>{coffee.price}</h4>
              
              <OrderButton
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleOrder(coffee)}
              >
                ORDER NOW! 🚀
              </OrderButton>
            </CoffeeCard>
          ))}
        </CoffeeMenu>

        <motion.div
          style={{ 
            position: 'fixed', 
            bottom: '20px', 
            right: '20px',
            background: 'rgba(255,255,255,0.9)',
            padding: '1rem',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div style={{ fontSize: '2rem' }}>☕</div>
          <div style={{ fontSize: '0.8rem', color: '#8B4513' }}>Fresh Coffee!</div>
        </motion.div>
      </Container>
    </>
  );
}

export default App;