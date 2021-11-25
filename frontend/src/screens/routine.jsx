import { useState, useCallback } from "react";
import Card from "../components/card";
import Icon from "../components/icon";
import LinkButton from "../components/linkbutton";
import "../stylesheets/home.css";

import { useSession } from "../contexts/useSession";

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

function TagItem({ item, index, onEditItem, onExludeItem }) {
  const [editable, setEditable] = useState(true);
  return (
    <div key={item.id} className="task">
      <div className="text-container">
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

function TagList({ itemList, onEditItem, onExludeItem }) {
  return (
    <div className="tasks-container">
      {itemList.length === 0 ? (
        <div className="no-tasks">
          <h6 className="subtitle is-6">Nenhuma Categoria</h6>
        </div>
      ) : (
        itemList.map((item, index) => (
          <TagItem
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

function CategoryScreen() {
  const { signOut } = useSession();
  const [tags, setTags] = useState([...taskList]);
  const [newTag, setNewTag] = useState("");

  const onExit = useCallback(() => {
    signOut();
  }, []);

  const onEditItem = useCallback(
    (index, description) => {
      const newArray = [...tags];
      newArray[index] = { description: description.target.value };
      setTags(newArray);
    },
    [tags]
  );

  const onExludeItem = useCallback(
    (index) => {
      const newArray = tags.filter(
        (tagItem, tagItemIndex) => tagItemIndex !== index
      );
      console.log(newArray, index);
      setTags(newArray);
    },
    [tags]
  );

  const createNewItem = useCallback(() => {
    const newArray = tags;
    newArray.push({ id: tags.length, description: newTag });
    setTags(newArray);
    setNewTag("");
  }, [tags, newTag]);

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

      <TagList
        itemList={tags}
        onEditItem={onEditItem}
        onExludeItem={onExludeItem}
      />
    </Card>
  );
}

export default CategoryScreen;
