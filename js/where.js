
    const allWhereExercises = [
      {
        name: "Clientes Mayores de 30",
        create_query: {
          enunciado: "Selecciona los clientes mayores de 30 años.",
          estructura: [
            { hint: "Comenzar", correct: "SELECT" },
            { hint: "Columnas", correct: "*" },
            { hint: "Origen", correct: "FROM" },
            { hint: "Tabla", correct: "clientes" },
            { hint: "Condición WHERE", correct: "WHERE" },
            { hint: "Edad mayor a 30", correct: "edad > 30" },
            { hint: "Cierre", correct: ";" }
          ],
          fragments: ["SELECT", "*", "FROM", "clientes", "WHERE", "edad > 30", ";"]
        },
        execute: {
          enunciado: "Ejecuta la consulta de clientes mayores de 30.",
          estructura: [
            { hint: "Consulta", correct: "SELECT nombre, edad FROM clientes" },
            { hint: "Condición", correct: "WHERE" },
            { hint: "Condición", correct: "edad > 30" },
            { hint: "Cierre", correct: ";" }
          ],
          fragments: ["SELECT nombre, edad FROM clientes", "WHERE", "edad > 30", ";"]
        },
        delete_query: {
          enunciado: "No hay eliminación directa en subconsultas.",
          estructura: [],
          fragments: []
        }
      },
      {
        name: "Productos sin Stock",
        create_query: {
          enunciado: "Selecciona los productos con stock igual a cero.",
          estructura: [
            { hint: "Comenzar", correct: "SELECT" },
            { hint: "Columnas", correct: "*" },
            { hint: "Origen", correct: "FROM" },
            { hint: "Tabla", correct: "productos" },
            { hint: "Condición WHERE", correct: "WHERE" },
            { hint: "Stock es 0", correct: "stock = 0" },
            { hint: "Cierre", correct: ";" }
          ],
          fragments: ["SELECT", "*", "FROM", "productos", "WHERE", "stock = 0", ";"]
        },
        execute: {
          enunciado: "Ejecuta la consulta de productos sin stock.",
          estructura: [
            { hint: "Consulta", correct: "SELECT nombre, precio FROM productos" },
            { hint: "Condición", correct: "WHERE" },
            { hint: "Condición", correct: "stock = 0" },
            { hint: "Cierre", correct: ";" }
          ],
          fragments: ["SELECT nombre, precio FROM productos", "WHERE", "stock = 0", ";"]
        },
        delete_query: {
          enunciado: "No se requiere borrar consultas WHERE.",
          estructura: [],
          fragments: []
        }
      },
      {
        name: "Facturas entre $100 y $500",
        create_query: {
          enunciado: "Crea una consulta que seleccione las facturas entre $100 y $500 usando `WHERE`.",
          estructura: [
            { hint: "Seleccionar", correct: "SELECT" },
            { hint: "Columnas", correct: "*" },
            { hint: "Origen", correct: "FROM" },
            { hint: "Tabla", correct: "facturas" },
            { hint: "Condición WHERE", correct: "WHERE" },
            { hint: "Total entre 100 y 500", correct: "total"},
            { hint: "Operador", correct: "BETWEEN" },
            { hint: "Rango", correct: "100 AND 500" },
            { hint: "Cierre", correct: ";" }
          ],
          fragments: ["SELECT", "*", "FROM",  "facturas", "WHERE", "total", "BETWEEN", "100 AND 500", ";"]
        },
        execute: {
          enunciado: "Ejecuta la consulta de facturas entre $100 y $500.",
          estructura: [
            { hint: "Consulta", correct: "SELECT"},
            { hint: "Identificador", correct: "f.id"},
            { hint: "Total factura", correct: "f.total"},
            { hint: "Origen", correct: "FROM"},
            { hint: "Tabla", correct: "facturas f"},
            { hint: "Condición WHERE", correct: "WHERE"},
            { hint: "Rango total y operador", correct: "f.total BETWEEN"},
            { hint: "Rango comparativo", correct: "100 AND 500"},
            { hint: "Cierre", correct: ";" }
          ],
          fragments: ["SELECT", "f.id", "f.total", "FROM", "facturas f", "WHERE", "f.total BETWEEN", "100 AND 500", ";"]
        },
        delete_query: {
          enunciado: "No se requiere eliminar consultas WHERE.",
          estructura: [],
          fragments: []
        }
      }
    ];

    let currentExerciseIndex = 0;
    let currentPhase = "create_query";
    let score = 0;

    const phaseText = document.getElementById("phaseText");
    const whereNameText = document.getElementById("whereNameText");
    const enunciadoDiv = document.getElementById("enunciado");
    const targetsDiv = document.getElementById("targets");
    const fragmentsDiv = document.getElementById("fragments");
    const timerSpan = document.getElementById("timer");
    const scoreSpan = document.getElementById("score");
    const difficultySelect = document.getElementById("difficulty");

    function startTimer() {
      let time;

      const level = difficultySelect.value;

      if (level === "principiante") time = 120;
      else if (level === "intermedio") time = 60;
      else if (level === "avanzado") time = 30;

      timerSpan.textContent = time;
      clearInterval(window.timer);
      window.timer = setInterval(() => {
        time--;
        timerSpan.textContent = time;
        if (time <= 0) {
          clearInterval(window.timer);
          Swal.fire({
            title: '⏱️ ¡Tiempo agotado!',
            text: 'Se reiniciará el ejercicio.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          }).then(() => loadCurrentPhase());
        }
      }, 1000);
    }

    function loadCurrentPhase() {
      const exercise = allWhereExercises[currentExerciseIndex];
      let data;

      if (currentPhase === "create_query") {
        data = exercise.create_query;
        phaseText.textContent = "Crear Consulta";
      } else if (currentPhase === "execute") {
        data = exercise.execute;
        phaseText.textContent = "Ejecutar Consulta";
      } else if (currentPhase === "delete_query") {
        data = exercise.delete_query;
        phaseText.textContent = "Eliminar Consulta";
      }

      whereNameText.textContent = exercise.name;
      enunciadoDiv.textContent = data.enunciado;
      fragmentsDiv.innerHTML = "";
      targetsDiv.innerHTML = "";

      // Zonas objetivo
      data.estructura.forEach((linea) => {
        const drop = document.createElement("div");
        drop.className = "drop-target border-2 border-dashed p-2 rounded code-line border-gray-500";
        drop.dataset.hint = linea.hint;
        drop.ondragover = e => e.preventDefault();
        drop.ondrop = e => {
          const dragged = e.dataTransfer.getData("text");
          if (dragged === linea.correct) {
            drop.textContent = dragged;
            drop.classList.add("bg-green-900");
            correctSound.play();
            drop.ondrop = null;
            [...fragmentsDiv.children].forEach(el => {
              if (el.textContent === dragged) el.remove();
            });
            score += 10;
            scoreSpan.textContent = score;
            checkCompletion(data);
          } else {
            drop.classList.add("bg-red-100");
            wrongSound.play();
            setTimeout(() => drop.classList.remove("bg-red-100"), 1000);
          }
        };
        targetsDiv.appendChild(drop);
      });

      // Fragmentos desordenados
      const shuffled = [...data.fragments].sort(() => 0.5 - Math.random());
      shuffled.forEach(text => {
        const el = document.createElement("div");
        el.textContent = text;
        el.draggable = true;
        el.className = "bg-blue-900 p-2 rounded cursor-move mb-1";
        el.ondragstart = e => e.dataTransfer.setData("text", text);
        fragmentsDiv.appendChild(el);
      });

      startTimer();
    }

    function checkCompletion(data) {
      const filled = [...targetsDiv.children].length === data.estructura.length &&
                     [...targetsDiv.children].every(el => el.textContent.trim() !== "");

      if (filled) {
        clearInterval(window.timer);

        let resultMessage = '';
        let consoleOutput = '';

        if (currentPhase === "create_query") {
          resultMessage = "✅ Consulta creada correctamente.";
          consoleOutput = "Query OK, 0 rows affected (0.01 sec)";
        } else if (currentPhase === "execute") {
          resultMessage = "✅ Consulta ejecutada.";
          consoleOutput = "SELECT nombre, edad FROM clientes WHERE edad > 30;\n+----+--------+-----+\n| ID | Nombre | Edad|\n+----+--------+-----+\n| 2  | Beto   | 32  |\n| 3  | Carlos | 35  |\n+----+--------+-----+";
        } else if (currentPhase === "delete_query") {
          resultMessage = "🗑️ No se requiere eliminar.";
          consoleOutput = "Este tipo de consulta no requiere borrado.";
        }

        Swal.fire({
          title: '✅ Fase completada',
          html: `<strong>${resultMessage}</strong><br/>
                 <pre class="bg-gray-800 text-green-400 p-3 rounded mt-2">${consoleOutput}</pre>`,
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(() => nextPhase());
      }
    }

    function nextPhase() {
      const keys = Object.keys(allWhereExercises[currentExerciseIndex]);
      const currentIndex = keys.indexOf(currentPhase);

      if (currentIndex < keys.length - 1 && keys[currentIndex + 1] !== "delete_query") {
        currentPhase = keys[currentIndex + 1];
      } else {
        if (currentExerciseIndex < allWhereExercises.length - 1) {
          currentExerciseIndex++;
          currentPhase = "create_query";
          Swal.fire({
            title: '🎉 ¡Ejercicio completado!',
            text: 'Pasando al siguiente...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: '🏆 ¡Todas las consultas WHERE completadas!',
            text: 'Has terminado todos los ejercicios.',
            icon: 'success',
            confirmButtonText: 'Volver a empezar'
          }).then(() => {
            currentExerciseIndex = 0;
            currentPhase = "create_query";
            score = 0;
            scoreSpan.textContent = 0;
          });
        }
      }

      loadCurrentPhase();
    }

    function restartBtnHandler() {
      currentExerciseIndex = 0;
      currentPhase = "create_query";
      score = 0;
      scoreSpan.textContent = 0;
      loadCurrentPhase();
    }

    // Manejo de dificultad
    difficultySelect.addEventListener("change", () => {
      Swal.fire({
        title: '🔄 ¿Reiniciar ejercicio?',
        text: 'Cambiar el nivel reiniciará la actividad.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          loadCurrentPhase();
        } else {
          difficultySelect.value = localStorage.getItem("lastDifficulty") || "intermedio";
        }
      });

      localStorage.setItem("lastDifficulty", difficultySelect.value);
    });

    document.getElementById("restartBtn").addEventListener("click", restartBtnHandler);

    document.addEventListener("DOMContentLoaded", () => {
      // Restablecer nivel si se recarga
      const savedLevel = localStorage.getItem("lastDifficulty") || "intermedio";
      difficultySelect.value = savedLevel;

      loadCurrentPhase();
    });
