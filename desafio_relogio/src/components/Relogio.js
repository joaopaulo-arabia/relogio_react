import React, { useState, useEffect } from "react";

function Relogio(){
    const [hora, alteraHora] = useState("00:00:00");

    useEffect(() => {

        atualizarRelogio();

        const intervalo = setInterval(atualizarRelogio, 1000);

        return () => {
            clearInterval(intervalo);
        };

    }, []);

    function atualizarRelogio(){
        const agora = new Date();

        const horas = agora.getHours().toString().padStart(2, "0");
        const minutos = agora.getMinutes().toString().padStart(2, "0");
        const segundos = agora.getSeconds().toString().padStart(2, "0");

        const horario = `${horas}:${minutos}:${segundos}`;

        alteraHora(horario);
    }

    return (
        <>
        <h1>{hora}</h1>

        </>
    );

};
export default Relogio;