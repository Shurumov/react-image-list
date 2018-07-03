import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
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
						<InputTitle titleChange={this.titleChange}  />
						<InputUrl urlChange ={this.urlChange} />
					<div className="pop-up__btn-wrapper">
						<ButtonCloseModal toggleModal={this.props.toggleModal}/>
						<ButtonAddImage title={this.state.title} url={this.state.url} addImage={this.props.addImage} />
					</div>
				</div>
			</div>
		)
	}
}

PopUp.propTypes={
	toggleModal: PropTypes.func,
	addImage: PropTypes.func
}


class InputTitle extends React.Component {
	render(){
		return(
			<div>
				<input onChange={this.props.titleChange} id="title" placeholder="Title" type="text" />
			</div>
		)
	}
}

InputTitle.propTypes = {
	titleChange: PropTypes.func
}

class InputUrl extends React.Component {
	render(){
		return(
			<div>
				<input onChange={this.props.urlChange} id="url" placeholder="URL" type="text"/>
			</div>
		)
	}
}

InputUrl.propTypes = {
	urlChange: PropTypes.func
}

class ButtonCloseModal extends React.Component {
	render(){
		return <div className="btn-close" onClick={this.props.toggleModal}>Close</div>
	}
}

ButtonCloseModal.propTypes = {
	toggleModal: PropTypes.func
}

class ButtonAddImage extends React.Component {
	render(){
		return(
					<div className="btn-add" 
							onClick={() => this.props.addImage(this.props.title, this.props.url, Math.random())}>
							Add
					</div>
		)}
}

ButtonAddImage.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string,
	addImage: PropTypes.func
}

class Header extends React.Component{
	render(){
		return( 
			<header className="page-header" >
				<div className="page-header__img"></div>
				<div className="page-header__title">Images</div>
			</header>
		)
	}
}

class ButtonOpenModal extends React.Component{
	render(){
		return (
			<div onClick={this.props.toggleModal} className="btn add-new-img">
				New
			</div>
		)
	}
}

ButtonOpenModal.propTypes = {
	toggleModal: PropTypes.func
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
							removeItem = {this.props.removeItem}/>
		});
		return (
			<div className="list-galery" >
				{imagesArray}
			</div>
		)
	}
}

ListGallery.propTypes = {
	imagesArray: PropTypes.arrayOf(
		PropTypes.shape({
		title: PropTypes.string,
		url: PropTypes.string,
		id: PropTypes.number
	})),
	removeItem: PropTypes.func,
	appWidth: PropTypes.number
}

class ListGalleryItem extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			mobileDelete: false
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
				<div className="list-galery__item_mobile-delete_cancel" onClick={this.hiddenMobileDelete}>Cancel</div>
				<div className="list-galery__item_mobile-delete" onClick={() => this.props.removeItem(id)}>Delete</div>
			</div>
		}
		return(
			<div className="list-galery__item" >
				<ListGalleryItemHeader 
					title = {this.props.title} 
					removeItem = {this.props.removeItem}	
					id = {this.props.id}
				/>
				<div className="list-galery__item-img">
					<img src={this.props.url} alt="" onClick={this.showMobileDelete} />
					{mobileDelete}
				</div>
			</div>
		)
	}
}

ListGalleryItem.propTypes = {
	appWidth: PropTypes.number,
	title: PropTypes.string,
	url: PropTypes.string,
	id: PropTypes.number,
	removeItem: PropTypes.func
}

class ListGalleryItemHeader extends React.Component {
	render(){
		const id = this.props.id
		return(
			<div className="list-galery__item-header">
				<div className="list-galery__item-title">{this.props.title}</div>
				<div className="list-galery__item_delete" onClick={() => this.props.removeItem(id)}>Delete</div>
			</div>
		) 
	}
}

ListGalleryItemHeader.propTypes = {
	title: PropTypes.string,
	removeItem: PropTypes.func,
	id: PropTypes.number
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
				<ButtonOpenModal toggleModal={this.toggleModal} />
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