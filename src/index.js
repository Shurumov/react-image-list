import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class PopUp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: "",
			url: ""
		};
		this.titleChange = this.titleChange.bind(this);
		this.urlChange = this.urlChange.bind(this);
	}
	titleChange(e){
		this.setState({
			title: e.target.value
		})
		
	}
	urlChange(e){
		this.setState({
			url: e.target.value
		})
	}

	render(){
		return(
			<div className="pop-up_wrapper">
				<div className="pop-up">
					<div className="pop-up__title">New image</div>
					<input onChange={this.titleChange} id="title" placeholder="Title" type="text" />
					<input onChange={this.urlChange} id="url" placeholder="URL" type="text"/>
					<div className="pop-up__btn-wrapper">
						<div className="btn-close" onClick={this.props.toggleModal}>Close</div>
						<div className="btn-add" 
									onClick={() => this.props.addImage(
										this.state.title, 
										this.state.url, 
										Math.random())}>Add</div>
					</div>
				</div>
			</div>
		)
	}
}

class Header extends React.Component{

	render(){
		return( 
			<header className="page-header" >
				<div className="page-header__img">
					
				</div>
				<div className="page-header__title">Images</div>
			</header>
		)
	}
}

class Button extends React.Component{
	render(){
		return (
			<div onClick={this.props.toggleModal} className="btn add-new-img">
				New
			</div>
		)
	}
}

class ListGallery extends React.Component{

	

	render(){
		const imagesArray = this.props.imagesArray.map((item) => {
			return <ListGalleryItem 
							appWidth={this.props.appWidth} 
							title={item.title}  
							url={item.url} 
							id={item.id} 
							key={item.id} 
							mobileDelete={item.mobileDelete}
							removeItem = {this.props.removeItem}/>
		});
		return (
			<div className="list-galery" >
				{imagesArray}
			</div>
		)
	}
}

class ListGalleryItem extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			mobileDelete: this.props.mobileDelete
		};
		this.showMobileDelete = this.showMobileDelete.bind(this);
		this.hiddenMobileDelete = this.hiddenMobileDelete.bind(this)
	}

	showMobileDelete(e){
		this.setState({
			mobileDelete: true
		})
		e.stopPropagation();
	}
	hiddenMobileDelete(){
		this.setState({
			mobileDelete: false
		})
	}

	render(){
		const id = this.props.id;
		let mobileDelete;
		if (this.state.mobileDelete && this.props.appWidth< 704){
			mobileDelete = 
			<div className="list-galery__item_mobile-delete_wrapper">
				<div className="list-galery__item_mobile-delete_cancel" 
							onClick={this.hiddenMobileDelete}>Cancel</div>
				<div className="list-galery__item_mobile-delete" 
							onClick={() => this.props.removeItem(id)}>Delete</div>
			</div>
		}
		return(
			<div className="list-galery__item" >
				<div className="list-galery__item-header">
					<div className="list-galery__item-title">{this.props.title}</div>
					<div className="list-galery__item_delete" onClick={() => this.props.removeItem(id)}>Delete</div>
				</div>
				<div className="list-galery__item-img">
					<img src={this.props.url} alt="" onClick={this.showMobileDelete} />
					{mobileDelete}
				</div>
			</div>
		)
	}
}

class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			showModal: false, 
			images: [
				{
					title: "Flower",
					url: "http://bipbap.ru/wp-content/uploads/2017/09/Cool-High-Resolution-Wallpaper-1920x1080-640x360.jpg",
					id: 1
				},
				{
					title: "Mountain",
					url: "http://www.radionetplus.ru/uploads/posts/2013-05/1369460621_panda-26.jpg",
					id: 2
				}
			],
			applicationWidth: null
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.addImageInArray = this.addImageInArray.bind(this);
		this.removeImageFromArray = this.removeImageFromArray.bind(this);
		this.appWidth = this.appWidth.bind(this);
	}

	appWidth(e) {
		this.setState({
			applicationWidth: e.target.width
		})
  }

	addImageInArray(title, url, id){
		const newItem = {
			title: title,
			url: url,
			id: id
		};

		const images = this.state.images;
		images.unshift(newItem)

		this.setState(prevState => ({
      images: images
    }));
	}

	removeImageFromArray(key){
		const newArray = this.state.images.filter(function(item){
			return item.id !== key;
		});
		this.setState({images: newArray})
	}

	toggleModal(){
		this.setState({
			showModal: !this.state.showModal
		})
	}



	

	render(){
		return(
			<div className="app-wrapper" onLoad={this.appWidth} >
				{this.state.showModal ? 
					<PopUp toggleModal={this.toggleModal} addImage={this.addImageInArray} /> 
					: null}
				<Header  />
				<Button toggleModal={this.toggleModal} />
				<ListGallery 
					imagesArray={this.state.images} 
					removeItem={this.removeImageFromArray} 
					appWidth={this.state.applicationWidth}
					/>
			</div>
		) 
	}
}

ReactDOM.render(<App />, document.getElementById('root'));