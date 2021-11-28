import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import Icon from "../components/icon";
import { useSession } from "../contexts/useSession";
import "../stylesheets/home.css";
import "../stylesheets/category.css"
import useFetchAPI from "../contexts/useFetchAPI";
import { toast } from "react-toastify";

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

function TagItem({ item, onDeletedTag }) {
  const [fetchEditCategory, editCategoryResponse] = useFetchAPI({ url: 'categories', method: 'put' })
  const [fetchDeleteCategory, deleteCategoryResponse] = useFetchAPI({ url: `categories/${item.id}`, method: 'delete' })
  const [editable, setEditable] = useState(false);
  const [description, setDescription] = useState(item.description)

  useEffect(() => {
    if (!editCategoryResponse) return

    if (editCategoryResponse.success) {
      item.description = description
      setEditable(false)
      toast.success(editCategoryResponse.message)
    } else {
      toast.error(editCategoryResponse.message)
    }    
  }, [editCategoryResponse])

  useEffect(() => {
    if (!deleteCategoryResponse) return

    if (deleteCategoryResponse.success) {
      onDeletedTag(item)
      toast.success(deleteCategoryResponse.message)
    } else {
      toast.error(deleteCategoryResponse.message)
    }    
  }, [deleteCategoryResponse])

  const onEditTag = () => {
    fetchEditCategory({ data: { ...item, description }, mockResponse: {...item, description}})
  }

  const onDeleteTag = () => {
    fetchDeleteCategory({})
  }

  return (
    <div key={item.id} className="task">
      <div className="text-container">
        {editable ? (
          <input
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="text">{description}</p>
        )}
      </div>
      <div className="buttons">
        {editable && (
          <Icon iconName='fa-check' onClick={onEditTag} />
        )}
        <Icon
          iconName={"fa-edit"}
          onClick={() => setEditable(!editable)}
        />
        <Icon iconName="fa-trash" onClick={onDeleteTag} />
      </div>
    </div>
  );
}

function TagList({ itemList, onDeletedTag }) {
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
            onDeletedTag={onDeletedTag}
          />
        ))
      )}
    </div>
  );
}

function CategoryScreen() {
  const { user } = useSession();
  const [fetchCategories, categoriesResponse] = useFetchAPI({ url: 'categories', method: 'get', disableSuccessNotification: true })
  const [fetchAddCategory, addCategoryResponse] = useFetchAPI({ url: 'categories', method: 'post' })
  const [addCategoryDescription, setAddCategoryDescription] = useState('')
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchCategories({ data: { user_id: user.id }, mockResponse: [...taskList]})
  }, [user.id])

  useEffect(() => {
    if (!categoriesResponse) return

    if (categoriesResponse.success) {
      setTags(categoriesResponse.data)
    }
  }, [categoriesResponse])

  useEffect(() => {
    if (!addCategoryResponse) return
    
    if (addCategoryResponse.success) {
      setTags(tags => [...tags, addCategoryResponse.data])
    }
  }, [addCategoryResponse])

  const createNewItem = (event) => {
    event.preventDefault()
    if (addCategoryDescription === '') {
      toast.error('A categoria não pode ter descrição vazia')
      return
    }

    fetchAddCategory({ data: { description: addCategoryDescription }, mockResponse: {
      id: 5, description: addCategoryDescription
    }})
  }

  const onDeletedTag = (tagItem) => {
    setTags(tags => tags.filter(tag => tag.id !== tagItem.id))
  }
  
  return (
    <Card className="home-card">
      <div className="header">
        <h1 className="title">Lista de Categorias</h1>
        <div>
          <Link to="/">
            <button className="button">Voltar</button>
          </Link>
        </div>
      </div>
      <form className='form'>
        <label className='add-category-input-container'>
          <input
            className="input add-category-input"
            type="text"
            placeholder='Descrição da Categoria'
            onChange={e => setAddCategoryDescription(e.target.value)}
          />
          <button className="button is-primary" onClick={createNewItem}>Adicionar Categoria</button>
        </label>
      </form>
      <div className='category-list'>        
        <h2 className='subtitle'>Categorias criadas</h2>
      </div>
      <TagList
        itemList={tags}
        onDeletedTag={onDeletedTag}
      />
    </Card>
  );
}

export default CategoryScreen;
