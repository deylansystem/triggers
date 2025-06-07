const allSubqueries = [
      {
        name: "Subconsulta de Rango",
        create_query: {
          enunciado: "Selecciona empleados que trabajan en departamentos llamados 'Ventas'.",
          estructura: [
            { hint: "Comenzar", correct: "SELECT * FROM empleados" },
            { hint: "Condición", correct: "WHERE id_departamento" },
            { hint: "Operador", correct: "IN" },
            { hint: "Subconsulta", correct: "(SELECT id FROM departamentos WHERE nombre = 'Ventas')" }
          ],
          fragments: [
            "SELECT * FROM empleados",
            "WHERE id_departamento",
            "IN",
            "(SELECT id FROM departamentos WHERE nombre = 'Ventas')"
          ]
        },
        execute: {
          enunciado: "Ejecuta la subconsulta anterior.",
          estructura: [
            { hint: "Comenzar", correct: "SELECT nombre, edad FROM empleados" },
            { hint: "Condición", correct: "WHERE id_departamento" },
            { hint: "Operador", correct: "IN" },
            { hint: "Subconsulta", correct: "(SELECT id FROM departamentos WHERE nombre = 'Ventas')" }
          ],
          fragments: [
            "SELECT nombre, edad FROM empleados",
            "WHERE id_departamento",
            "IN",
            "(SELECT id FROM departamentos WHERE nombre = 'Ventas')"
          ],
          consoleOutput: `
SELECT nombre, edad FROM empleados WHERE id_departamento IN
(SELECT id FROM departamentos WHERE nombre = 'Ventas');

+----+--------+-----+
| ID | Nombre | Edad |
+----+--------+-----+
|  1 | Ana    |  32 |
|  2 | Beto   |  35 |
+----+--------+-----+
`
        },
        delete_query: {
          enunciado: "No se requiere borrar subconsultas.",
          estructura: [],
          fragments: []
        }
      },
      {
        name: "Clientes sin Facturas",
        create_query: {
          enunciado: "Selecciona los clientes que NO han hecho ninguna factura.",
          estructura: [
            { hint: "Comenzar", correct: "SELECT * FROM clientes" },
            { hint: "Condición", correct: "WHERE id" },
            { hint: "Operador", correct: "NOT IN" },
            { hint: "Subconsulta", correct: "(SELECT DISTINCT cliente_id FROM facturas)" }
          ],
          fragments: [
            "SELECT * FROM clientes",
            "WHERE id",
            "NOT IN",
            "(SELECT DISTINCT cliente_id FROM facturas)"
          ]
        },
        execute: {
          enunciado: "Ejecuta la subconsulta de clientes sin facturas.",
          estructura: [
            { hint: "Consulta", correct: "SELECT nombre FROM clientes" },
            { hint: "Condición", correct: "WHERE id" },
            { hint: "Operador", correct: "NOT IN" },
            { hint: "Subconsulta", correct: "(SELECT DISTINCT cliente_id FROM facturas)" }
          ],
          fragments: [
            "SELECT nombre FROM clientes",
            "WHERE id",
            "NOT IN",
            "(SELECT DISTINCT cliente_id FROM facturas)"
          ],
          consoleOutput: `
SELECT nombre FROM clientes WHERE id NOT IN
(SELECT DISTINCT cliente_id FROM facturas);

+--------+
| Nombre |
+--------+
| Ana    |
+--------+
`
        },
        delete_query: {
          enunciado: "No se requiere borrar consultas.",
          estructura: [],
          fragments: []
        }
      },
      {
        name: "Promedio Salarial",
        create_query: {
          enunciado: "Selecciona empleados con salario mayor al promedio.",
          estructura: [
            { hint: "Seleccionar empleados", correct: "SELECT nombre, salario FROM empleados" },
            { hint: "Condición", correct: "WHERE salario" },
            { hint: "Operador", correct: ">" },
            { hint: "Subconsulta", correct: "(SELECT AVG(salario) FROM empleados)" }
          ],
          fragments: [
            "SELECT nombre, salario FROM empleados",
            "WHERE salario",
            ">",
            "(SELECT AVG(salario) FROM empleados)"
          ]
        },
        execute: {
          enunciado: "Ejecuta la consulta de empleados con salario superior al promedio.",
          estructura: [
            { hint: "Consulta", correct: "SELECT nombre, salario FROM empleados" },
            { hint: "Condición", correct: "WHERE salario" },
            { hint: "Operador", correct: ">" },
            { hint: "Subconsulta", correct: "(SELECT AVG(salario) FROM empleados)" }
          ],
          fragments: [
            "SELECT nombre, salario FROM empleados",
            "WHERE salario",
            ">",
            "(SELECT AVG(salario) FROM empleados)"
          ],
          consoleOutput: `
SELECT nombre, salario FROM empleados WHERE salario > 
(SELECT AVG(salario) FROM empleados);

+--------+----------+
| Nombre | Salario  |
+--------+----------+
| Carlos | 2800.00  |
+--------+----------+
`
        },
        delete_query: {
          enunciado: "No se requiere borrar consultas.",
          estructura: [],
          fragments: []
        }
      }
    ];

    let currentSubqueryIndex = 0;
    let currentPhase = "create_query";
    let score = 0;

    const phaseText = document.getElementById("phaseText");
    const subqueryNameText = document.getElementById("subqueryNameText");
    const enunciadoDiv = document.getElementById("enunciado");
    const targetsDiv = document.getElementById("targets");
    const fragmentsDiv = document.getElementById("fragments");
    const timerSpan = document.getElementById("timer");
    const scoreSpan = document.getElementById("score");
    const difficultySelect = document.getElementById("difficulty");
    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");

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
      const exercise = allSubqueries[currentSubqueryIndex];
      let data;

      // Determinar fase actual
      if (currentPhase === "create_query") {
        data = exercise.create_query;
        phaseText.textContent = "Crear Subconsulta";
      } else if (currentPhase === "execute") {
        data = exercise.execute;
        phaseText.textContent = "Ejecutar Subconsulta";
      } else if (currentPhase === "delete_query") {
        data = exercise.delete_query;
        phaseText.textContent = "Borrar Consulta";
      }

      subqueryNameText.textContent = exercise.name;
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
            setTimeout(() => drop.classList.remove("bg-red-100"), 1000);
            wrongSound.play().catch(() => {});
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
        correctSound.play().catch(() => {});

        let resultMessage = '';
        let consoleOutput = '';

        if (currentPhase === "create_query") {
          resultMessage = "✅ Consulta creada correctamente.";
          consoleOutput = "Query OK, 0 rows affected (0.01 sec)";
        } else if (currentPhase === "execute") {
          resultMessage = "✅ Consulta ejecutada.";
          consoleOutput = data.consoleOutput || "No hay salida definida.";
        } else if (currentPhase === "delete_query") {
          resultMessage = "🗑️ No se requiere eliminar.";
          consoleOutput = "Este tipo de consulta no requiere borrado.";
        }

        Swal.fire({
          title: '✅ Fase completada',
          html: `<strong>${resultMessage}</strong><br/><pre class="bg-gray-800 text-green-400 p-3 rounded mt-2">${consoleOutput}</pre>`,
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(() => nextPhase());
      }
    }

    function nextPhase() {
      const keys = Object.keys(allSubqueries[currentSubqueryIndex]);
      const currentIndex = keys.indexOf(currentPhase);

      if (currentIndex < keys.length - 1 && keys[currentIndex + 1] !== "delete_query") {
        currentPhase = keys[currentIndex + 1];
      } else {
        if (currentSubqueryIndex < allSubqueries.length - 1) {
          currentSubqueryIndex++;
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
            title: '🏆 ¡Todas las subconsultas completadas!',
            text: '¡Has terminado todos los ejercicios!',
            icon: 'success',
            confirmButtonText: 'Volver a empezar'
          }).then(() => {
            currentSubqueryIndex = 0;
            currentPhase = "create_query";
            score = 0;
            scoreSpan.textContent = 0;
            loadCurrentPhase();
          });
        }
      }

      loadCurrentPhase();
    }

    function restartBtnHandler() {
      currentSubqueryIndex = 0;
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
      const lastDifficulty = localStorage.getItem("lastDifficulty") || "intermedio";
      difficultySelect.value = lastDifficulty;
      loadCurrentPhase();
    });
