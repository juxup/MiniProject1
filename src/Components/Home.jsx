import {useState, useEffect} from "react";
export default function Home(){
    const [items,setItems]=useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetch("/items.json")
          .then((response) => response.json())
          .then((data) => {
            setItems(data.items);
          })
      }, []);

    return(
        <div className="flex h-screen p-4">
            <h1 className="text-2xl font-bold text-center my-4">Movies</h1>
            <div className="w-1/2 p-4 border-r">
                <ul>
                {items.map((item) => (
                    <li key={item.id} className="cursor-pointer hover:bg-gray-200" onMouseEnter={()=>setSelectedItem(item)}> 
                        {item.name}</li>))}
                </ul>
            </div>
            <div className="w-1/2 p-4">
                {selectedItem ? (
                    <div>
                        <h2 className="text-xl">{selectedItem.name}</h2>
                        <p>{selectedItem.details}</p></div>
                ):(
                    <p>Hover over the item to see details</p>
                )}
            </div>
        </div>
    );
    
    
    }