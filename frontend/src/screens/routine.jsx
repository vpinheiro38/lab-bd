import { useState, useCallback } from "react";
import Card from "../components/card";
import Icon from "../components/icon";
import LinkButton from "../components/linkbutton";
import Modal from "../components/modal";
import "../stylesheets/home.css";

import { useSession } from "../contexts/useSession";
import Dropdown from "../components/dropdown";

const routineList = [
  {
    id: 0,
    description: "Descrição da Tarefa",
    tags: [{ id: 0, description: "Tag 1" }],
    routines: [
      { id: 0, turn: "Manhã", weekdays: ["segunda-feira", "quarta-feira"] },
    ],
  },
  {
    id: 1,
    description: "Descrição da Tarefa",
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 2" },
    ],
    routines: [
      { id: 0, turn: "Manhã", weekdays: ["segunda-feira", "quarta-feira"] },
      { id: 1, turn: "Tarde", weekdays: ["terça-feira", "quinta-feira"] },
    ],
  },
  {
    id: 2,
    description: "Descrição da Tarefa",
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 2" },
      { id: 2, description: "Tag 3" },
    ],
    routines: [{ id: 0, turn: "Manhã", weekdays: ["sábado", "domingo"] }],
  },
];

function CardItem({ item, index, onEditItem, onExludeItem }) {
  const [isVisible, setVisible] = useState(false);

  const handleVisible = useCallback(() => setVisible(!isVisible), [isVisible]);

  return (
    <div key={item.id} className="task">
      <div className="text-container">
        <div className="tags">
          {item.tags.map((tag) => (
            <span key={tag.id} className="tag is-primary">
              {tag.description}
            </span>
          ))}
        </div>

        <p className="text">{item.description}</p>

        <section className="routines">
          {item.routines.map((routine) => (
            <p className="routine_item" key={routine.id}>
              {routine.turn}
            </p>
          ))}
        </section>
      </div>
      <div className="buttons">
        <Icon iconName="fa-edit" onClick={handleVisible} />
        <Icon iconName="fa-trash" onClick={() => onExludeItem(index)} />
      </div>

      <Modal
        modalState={isVisible}
        closeModal={handleVisible}
        title="Editar Routina"
      >
        <section className="modal_content">
          <div className="modal_content">
            <h6>Titulo: </h6>
            <input
              className="text-container input"
              value={item.description}
              onChange={(description) => onEditItem(index, description)}
            />
          </div>

          <div className="modal_content">
            <h6>Categorias: </h6>
            {item.tags.map((rountine) => (
              <div key={rountine.id} className="add">
                <Dropdown title="Categorias" />
              </div>
            ))}
          </div>

          <div className="modal_content">
            <h6>Disponibilidade: </h6>
            {item.routines.map((rountine) => (
              <div key={rountine.id} className="add">
                <Dropdown title="Turno" />
                <Dropdown title="Dias da Semana" />
              </div>
            ))}
          </div>
        </section>
      </Modal>
    </div>
  );
}

function CardList({ itemList, onEditItem, onExludeItem }) {
  return (
    <div className="tasks-container">
      {itemList.length === 0 ? (
        <div className="no-tasks">
          <h6 className="subtitle is-6">Nenhuma Categoria</h6>
        </div>
      ) : (
        itemList.map((item, index) => (
          <CardItem
            item={item}
            onEditItem={onEditItem}
            onExludeItem={onExludeItem}
            index={index}
          />
        ))
      )}
    </div>
  );
}

function Screen() {
  const { signOut } = useSession();
  const [items, setItems] = useState([...routineList]);
  const [newTag, setNewTag] = useState("");

  const onExit = useCallback(() => signOut(), [signOut]);

  const onEditItem = useCallback(
    (index, description) => {
      const newArray = [...items];
      newArray[index] = { description: description.target.value };
      setItems(newArray);
    },
    [items]
  );

  const onExludeItem = useCallback(
    (index) => {
      const newArray = items.filter(
        (tagItem, tagItemIndex) => tagItemIndex !== index
      );
      console.log(newArray, index);
      setItems(newArray);
    },
    [items]
  );

  const createNewItem = useCallback(() => {
    const newArray = items;
    newArray.push({ id: items.length, description: newTag });
    setItems(newArray);
    setNewTag("");
  }, [items, newTag]);

  const handleNewTag = useCallback((event) => {
    setNewTag(event.target.value);
  }, []);

  return (
    <Card className="home-card">
      <div className="header">
        <h1 className="title">Routina</h1>
        <div>
          <LinkButton to="/category" describe="Categorias" />
          <LinkButton to="/" describe="Tarefas" />
          <button className="button" onClick={onExit}>
            Sair
          </button>
        </div>
      </div>

      <section className="add_button">
        <Icon iconName="fa-plus" onClick={createNewItem} />
      </section>

      <CardList
        itemList={items}
        onEditItem={onEditItem}
        onExludeItem={onExludeItem}
      />
    </Card>
  );
}

export default Screen;
