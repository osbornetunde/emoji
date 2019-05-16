// 'use strict';

class ProductList extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            faces: [],
            page: 1,
            loading: false,
            prevY: 0,
            size: 1,
            id: 1,
            price: 0
        } 
    }

componentDidMount() {
    this.getResult(this.state.page);
    
    //options
    let options = {
        root: null, //Page as root
        rootMargin: '0px',
        threshold: 1.0
    };

    //Create an observer
    this.observer = new IntersectionObserver(
        this.handleObserver.bind(this), //callback
        options
    );

    //observe the 'loadingRef'
    this.observer.observe(this.loadingRef);


}

handleObserver( entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
        const lastFace = this.state.page + 1
        console.log(lastFace)
        const curPage = lastFace;
        this.getResult(curPage);
        this.setState({ page: curPage })
    }
    this.setState({ prevY: y });
}
    
    getResult =  async (page) => {
        this.setState({ loading: true })
        // console.log(page)
        const response = await axios.get("http://localhost:3000/products?",{
             params: {
                 _page: page,
                 _limit: 15
             }
         })
            this.setState({faces: [...this.state.faces, ...response.data]})
            this.setState({ loading: false })
        }
    


    setSizeHandler = (e) => {
        this.setState({size: e.target.value})
    }

    setPriceHandler = e => {
        this.setState({price: e.target.value})
    }

    setIdHandler = e => {
        this.setState({id: e.target.value})
    }
            
    renderContent = () => {
        console.log(this.state.faces)
       return this.state.faces.map(face => {
            return (
                <div key={face.id} className="card__items">{face.face}</div>
            )
        })
    }
    render() {
        const loadingfaces = { display: this.state.loading ? "block" : "none"}
    return(
        <div className="container">
        <span>
        <input 
            onChange={this.setSizeHandler}
            className="field size__field" 
            placeholder="Enter Size in pixels" 
            data-target="size" 
            value={this.state.size}
        />
        <input 
            onChange={this.setPriceHandler}
            className="field price__field"  
            placeholder="Enter Price" 
            data-target="price" 
            value={this.state.price}
        />
        <input 
            onChange={this.setIdHandler}
            className="field id__field" 
            placeholder="Enter Id" 
            data-target="id"
            value={this.state.id}
        />
        </span>
        <div className="cards">
            {this.renderContent()}
        </div>
        <div ref={loadingRef => (this.loadingRef = loadingRef)} style={{"height": "100px", "margin": "1rem"}}>
            <span style={loadingfaces}>Loading...</span>
        </div>
        {this.state.faces.length === 500 ? <p>End of Catalogue</p> : null}
        </div>
    )
    }
}

    
ReactDOM.render(<ProductList/>, document.getElementById('root'));
