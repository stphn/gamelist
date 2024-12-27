import list from '../../data/gamelist2.json'

const ItemList = () => {
  return (
    <div>
      <h1>Game List</h1>
      <ul>
        {list.items.map((item, index) => {
          return <li key={index}>{item.label}</li>
        })}
      </ul>
    </div>
  )
}

// export the component
export default ItemList
