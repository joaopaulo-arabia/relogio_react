export default function ControleGerais({
  onReiniciar,
  onDesfazer
}) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      margin: '20px 0'
    }}>
      <button onClick={onReiniciar}>
        🔄 Reiniciar Partida
      </button>

      <button onClick={onDesfazer}>
        ↩️ Desfazer Última Jogada
      </button>
    </div>
  );
}