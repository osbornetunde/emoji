'use strict';

// import format from "format-number";
// import {format} from "/modules/format-number.js"

// var format = require("./format")
class ProductList extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            faces: [],
            page: 1,
            loading: false,
            prevY: 0
        } 
    }

componentDidMount() {
    this.getfaces(this.state.page);
    
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
        const nextPage = this.state.page + 1
        const currentPage = nextPage;
        this.getfaces(currentPage);
        this.setState({ page: currentPage })
    }
    this.setState({ prevY: y });
}


    
    getfaces =  async (page) => {
        this.setState({ loading: true })
        const response = await axios.get("http://localhost:3000/products?",{
             params: {
                 _page: page,
                 _limit: 15
             }
         })
        //  console.log(response)
            this.setState({faces: [...this.state.faces, ...response.data]})
            this.setState({ loading: false })
        }
    
    // sortHandler = async (size, price, id) => {
    //     this.setState({ loading: true })
    //     const response = await axios.get("http://localhost:3000/products?",{
    //          params: {
    //              _sort: size || price || id,
    //              _limit: 15
    //          }
    //      })
    //      this.setState({faces: [...this.state.faces, ...response.data]})
    //      this.setState({ loading: false })
    // }


    

    

    setIdHandler = e => {
        this.setState({id: "id"})
    }

    // // Helper function to render adverts
    // renderAdverts = () => {
           
    //     {this.state.faces.length % 20 === 0 ? 
    //         <img className="ad" src={`/ads/?r=${randomNumber} + `}/> :
    //         null
    //         }
        
    // };
      
    // Helper function to render faces
    renderContent = () => {
        console.log(this.state.faces)
       return this.state.faces.map(face => {
            return (
                <div 
                    key={face.id} 
                    className="card"
                >
                    <div className="card__items">{face.face}</div>
                <div className="card__details">
                    <p>{`size: ${face.size}px`}</p>
                    <p>{`price: $${(face.price/100).toFixed(2)}`}</p>
                    <p>{face.date}</p>
                </div>
                </div>
            )
        })
        
    }
    render() {
        const randomNumber = Math.floor(Math.random() * 1000)
        const loadingfaces = { display: this.state.loading ? "block" : "none"}
        const loadingAdverts = { display: this.state.faces.length % 20 === 0 ? "block" : "none"}
    return(
        <div className="container">
        <div className="cards">
            {this.renderContent()}
        </div>
        <img className={loadingAdverts} src={`/ads/?r=${randomNumber} + `}/>
        <div 
            ref={loadingRef => (this.loadingRef = loadingRef)}
            style={{"height": "100px", "margin": "1rem"}}
        >
            <span className="loading" style={loadingfaces}>
                <h1>
                    <span>L</span>
                    <span>o</span>
                    <span>a</span>
                    <span>d</span>
                    <span>i</span>
                    <span>n</span>
                    <span>g</span>
                </h1>
            </span>
        </div>
        {this.state.faces.length === 500 ? <p className="end">End of Catalogue</p> : null}
        </div>
    )
    }
}

    
ReactDOM.render(<ProductList/>, document.getElementById('root'));
