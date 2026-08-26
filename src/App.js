import { useState } from 'react';

import Placar from './components/Placar';
import AcoesJogo from './components/AcoesJogo';
import Historico from './components/Historico';
import ControleGerais from './components/ControleGerais';

export default function App() {

  const [pontosA, setPontosA] = useState(0);
  const [pontosB, setPontosB] = useState(0);

  // true = Time A
  // false = Time B
  const [posseTimeA, setPosseTimeA] = useState(true);

  const [historico, setHistorico] = useState([]);

  // Guarda os estados anteriores para permitir desfazer
  const [estados, setEstados] = useState([]);

  function registrarPontos(pontos) {

    // Guarda o estado atual antes da jogada
    setEstados(prev => [
      ...prev,
      {
        pontosA,
        pontosB,
        posseTimeA
      }
    ]);

    const timeAtual = posseTimeA ? 'Time A' : 'Time B';

    if (posseTimeA) {
      setPontosA(pontosA + pontos);
    } else {
      setPontosB(pontosB + pontos);
    }

    setHistorico(prev => [
      ...prev,
      `${timeAtual} marcou +${pontos} ponto(s)`
    ]);

    setPosseTimeA(!posseTimeA);
    
  }

  function passarBola() {
    setPosseTimeA(!posseTimeA);
  }

  // NOVA FUNÇÃO
  function reiniciarPartida() {

    setPontosA(0);
    setPontosB(0);
    setPosseTimeA(true);
    setHistorico([]);
    setEstados([]);
  }

  // NOVA FUNÇÃO
  function desfazerJogada() {

    if (estados.length === 0) {
      return;
    }

    const ultimoEstado = estados[estados.length - 1];

    setPontosA(ultimoEstado.pontosA);
    setPontosB(ultimoEstado.pontosB);
    setPosseTimeA(ultimoEstado.posseTimeA);

    setEstados(prev => prev.slice(0, -1));

    setHistorico(prev => prev.slice(0, -1));
  }

  // Verifica se alguém chegou a 21 pontos
  let vencedor = null;

  if (pontosA >= 21) {
    vencedor = 'Time A';
  } else if (pontosB >= 21) {
    vencedor = 'Time B';
  }

  return (
    <div style={{
      textAlign: 'center',
      fontFamily: 'sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>

      <h1>🏀 Placar do Jogo</h1>

      {/* DESAFIO 3 - Vencedor */}
      {vencedor && (
        <div style={{
          backgroundColor: '#dcfce7',
          border: '2px solid #22c55e',
          padding: '15px',
          margin: '20px 0',
          borderRadius: '10px',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          🏆 {vencedor} venceu a partida!
        </div>
      )}

      <Placar
        pontosA={pontosA}
        pontosB={pontosB}
        posseTimeA={posseTimeA}
      />

      <AcoesJogo
        onPontuar={registrarPontos}
        onPassarBola={passarBola}
      />

      <ControleGerais
        onReiniciar={reiniciarPartida}
        onDesfazer={desfazerJogada}
      />

      <Historico historico={historico} />

    </div>
  );
}