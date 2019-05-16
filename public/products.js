// 'use strict';


class ProductList extends React.Component {
    constructor(props){
        super(props);
        this.state = { products: [] } 
    }

componentDidMount() {
    const getResult = async () => {
         const response = await axios.get("http://localhost:3000/products")
            // console.log(response)
            this.setState({products: response.data})
        }
    getResult();
}
            
    renderContent = () => {
        console.log(this.state.products)
       return this.state.products.map(product => {
            return (
                <div key={product.id}>{product.face}</div>
            )
        })
    }
    render() {

    return(
        <div>{this.renderContent()}</div>
    )
    }
}

    
ReactDOM.render(<ProductList/>, document.getElementById('root'));
