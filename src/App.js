import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import { data } from './data/data';

function App() {
  const [timer, setTimer] = useState(0);
  const [toggle, setToggle] = useState(false);

  const [respuestas, setRespuestas] = useState({
    radio0: '',
    radio1: '',
    radio2: '',
    radio3: '',
    radio4: '',
  });

  const barraProgres = useRef();
  const dialogInit = useRef();

  useEffect(() => {
    let counter;

    if (toggle) {
      counter = setInterval(() => {
        setTimer((timer) => timer + 5);

        if (timer <= 100) {
          barraProgres.current.style.width = `${timer}%`;
        } else {
          clearInterval(counter);
          setToggle(false);
          Swal.fire({
            title: 'Su tiempo ha finalizado',
            showDenyButton: true,
            confirmButtonText: 'Ver resultados',
            denyButtonText: `Reiniciar`,
          }).then((result) => {
            if (result.isConfirmed) {
              results();
            } else if (result.isDenied) {
              resert();
            }
          });
        }
      }, 1000);
    }

    return () => clearInterval(counter);
  }, [toggle, timer]);

  let choices = data.map((item) => item.choices);
  let answers = data.map((item) => item.answer);
  let respuestasValues = Object.values(respuestas);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRespuestas({ ...respuestas, [name]: value });
  };

  const results = () => {
    let contador = 0;
    for (let i = 0; i < 5; i++) {
      if (answers[i].toLowerCase() === respuestasValues[i].toLowerCase()) {
        contador++;
      }
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Tuvo ${contador} respuestas correctas`,
      showConfirmButton: false,
      timer: 1500,
    });

    resert();
  };

  const resert = () => {
    dialogInit.current.style.display = 'grid';
    setTimer(0);
  };

  const handleDialog = () => {
    dialogInit.current.style.display = 'none';
    setToggle(true);
  };
  return (
    <main>
      <div className='appProgress'>
        <div ref={barraProgres} className='appProgressPorc'></div>
      </div>
      <div className='appContainer'>
        <section className='appCard'>
          <h2 className='appTitle'>Quiz JavaScript</h2>
          {data.map((item) => {
            return (
              <div className='appBody' key={item.id}>
                <p>
                  {item.id}. {item.question}
                </p>
                <div className='appButtons'>
                  {choices[item.id - 1].map((btn, index) => {
                    return (
                      <div key={index}>
                        <input
                          type='radio'
                          name={`radio${item.id - 1}`}
                          onChange={handleOnChange}
                          value={btn}
                        />
                        <label htmlFor={`radio${item.id - 1}`}>{btn}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <dialog ref={dialogInit}>
        <div>
          <h2>Iniciar cuestionario</h2>
          <button onClick={handleDialog}>Iniciar</button>
        </div>
      </dialog>
    </main>
  );
}

export default App;
