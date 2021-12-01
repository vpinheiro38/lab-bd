import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/card";
import Icon from "../components/icon";
import { useSession } from "../contexts/useSession";
import "../stylesheets/home.css";
import "../stylesheets/category.css"
import useFetchAPI from "../contexts/useFetchAPI";
import { toast } from "react-toastify";

function TagItem({ item, onEditedCategory, onDeletedTag }) {
  const { user } = useSession();

  const [fetchEditCategory, editCategoryResponse] = useFetchAPI({ url: 'categories', method: 'put' })
  const [fetchDeleteCategory, deleteCategoryResponse] = useFetchAPI({ url: 'categories', method: 'delete' })

  const [editable, setEditable] = useState(false);
  const [description, setDescription] = useState(item.description)

  useEffect(() => {
    if (!editCategoryResponse) return

    if (editCategoryResponse.success) {
      setEditable(false)
      onEditedCategory()
    }
  }, [editCategoryResponse])

  useEffect(() => {
    if (!deleteCategoryResponse) return
    if (deleteCategoryResponse.success) onDeletedTag()
  }, [deleteCategoryResponse])

  const onEditTag = () => {
    fetchEditCategory({
      extraPath: `/${item.id}`,
      data: { description, category_user: `${user.id}` },
      useAxios: true
    })
  }

  const onDeleteCategory = () => fetchDeleteCategory({ extraPath: `/${item.id}`, useAxios: true })

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
          <p className="text">{item.description}</p>
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
        <Icon iconName="fa-trash" onClick={onDeleteCategory} />
      </div>
    </div>
  );
}

function TagList({ itemList, onEditedCategory, onDeletedTag }) {
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
            onEditedCategory={onEditedCategory}
            onDeletedTag={onDeletedTag}
          />
        ))
      )}
    </div>
  );
}

function CategoryScreen() {
  const { user } = useSession();
  const navigate = useNavigate();
  
  const [fetchCategories, categoriesResponse] = useFetchAPI({ url: 'categories', method: 'get', disableNotifications: true })
  const [fetchAddCategory, addCategoryResponse] = useFetchAPI({ url: 'categories', method: 'post' })
  
  const [addCategoryDescription, setAddCategoryDescription] = useState('')
  const [categories, setCategories] = useState([]);

  const createNewItem = (event) => {
    event.preventDefault()
    if (addCategoryDescription === '') {
      toast.error('A categoria não pode ter descrição vazia')
      return
    }

    fetchAddCategory({
      data: { description: addCategoryDescription, category_user: user.id },
      useAxios: true
    })
  }

  const reloadCategories = () => fetchCategories({ queries: [`user=${user.id}`], useAxios: true })

  useEffect(() => {
    fetchCategories({
      queries: [`user=${user.id}`],
      useAxios: true
    })
  }, [user])

  useEffect(() => {
    if (!categoriesResponse) return
    if (categoriesResponse.success) setCategories(categoriesResponse.data)
    else setCategories([])
  }, [categoriesResponse])

  useEffect(() => {
    if (!addCategoryResponse) return  
    if (addCategoryResponse.success) setCategories(categories => [...categories, addCategoryResponse.data])
  }, [addCategoryResponse])
  
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
        itemList={categories}
        onEditedCategory={reloadCategories}
        onDeletedTag={reloadCategories}
      />
    </Card>
  );
}

export default CategoryScreen;
