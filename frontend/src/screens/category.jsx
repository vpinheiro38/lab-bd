import { useState } from "react";
import Card from "../components/card";
import Icon from "../components/icon";
import Multiselect from "multiselect-react-dropdown";
import "../stylesheets/home.css";
import Dropdown from "../components/dropdown";

const taskList = [
  {
    id: 0,
    description: "Descrição da Tarefa",
  },
  {
    id: 1,
    description: "Descrição da Tarefa",
  },
  {
    id: 2,
    description: "Descrição da Tarefa",
  },
];

function CategoryScreen() {
  const [tasks, setTasks] = useState([...taskList]);
  const [renderCompleted, setRenderCompleted] = useState(false);
  const priorities = [
    { id: 0, name: "Baixa" },
    { id: 1, name: "Média" },
    { id: 2, name: "Alta" },
  ];
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  const onExit = () => {};

  const onFilterPriorities = (selectedList, selectedItem) => {};

  const onUnfilterPriorities = (selectedList, selectedItem) => {};

  const TaskList = ({ title, completed }) => (
    <div className="tasks-container">
      <h2 className="subtitle">{title}</h2>
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <h6 className="subtitle is-6">Nenhuma Tarefa</h6>
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task">
            <div className="text-container">
              <p className="text">{task.description}</p>
            </div>
            <div className="buttons">
              <Icon iconName="fa-check" />
              <Icon iconName="fa-edit" />
              <Icon iconName="fa-trash" />
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <Card className="home-card">
      <div className="header">
        <h1 className="title">Lista de Categorias</h1>
        <div>
          <button className="button button-header" onClick={onExit}>
            Rotinas
          </button>
          <button className="button button-header" onClick={onExit}>
            Categorias
          </button>
          <button
            className="button button-header"
            onClick={() => setRenderCompleted(!renderCompleted)}
          >
            Ver {renderCompleted ? "Não Concluídas" : "Concluídas"}
          </button>
          <button className="button" onClick={onExit}>
            Sair
          </button>
        </div>
      </div>

      {renderCompleted ? (
        <TaskList title="Concluídas" completed={true} />
      ) : (
        <TaskList title="Não Concluídas" completed={false} />
      )}
    </Card>
  );
}

export default CategoryScreen;
