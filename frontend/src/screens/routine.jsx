import { useState, useCallback } from "react";
import Card from "../components/card";
import Icon from "../components/icon";
import LinkButton from "../components/linkbutton";
import "../stylesheets/home.css";

import { useSession } from "../contexts/useSession";

const routineList = [
  {
    id: 0,
    description: "Descrição da Tarefa",
    tags: [{ id: 0, description: "Tag 1" }],
  },
  {
    id: 1,
    description: "Descrição da Tarefa",
    tags: [
      { id: 0, description: "Tag 1" },
      { id: 1, description: "Tag 2" },
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
  },
];

function CardItem({ item, index, onEditItem, onExludeItem }) {
  const [editable, setEditable] = useState(true);
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
        {!editable ? (
          <input
            className="text-container"
            value={item.description}
            onChange={(description) => onEditItem(index, description)}
          />
        ) : (
          <p className="text">{item.description}</p>
        )}
      </div>
      <div className="buttons">
        {editable ? (
          <Icon iconName="fa-edit" onClick={() => setEditable(false)} />
        ) : (
          <Icon iconName="fa-check" onClick={() => setEditable(true)} />
        )}
        <Icon iconName="fa-trash" onClick={() => onExludeItem(index)} />
      </div>
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

      <div className="add">
        <input
          className="text-container"
          value={newTag}
          onChange={handleNewTag}
        />
        <Icon iconName="fa-plus" onClick={createNewItem} />
      </div>

      <CardList
        itemList={items}
        onEditItem={onEditItem}
        onExludeItem={onExludeItem}
      />
    </Card>
  );
}

export default Screen;
