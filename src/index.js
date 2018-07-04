import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
    };
    this.titleChange = this.titleChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
  }

  titleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  urlChange(e) {
    this.setState({
      url: e.target.value,
    });
  }

  render() {
    const { titleChange, urlChange } = this;
    const { toggleModal, addImage } = this.props;
    const { title, url } = this.state;
    return (
      <div className="pop-up_wrapper">
        <div className="pop-up">
          <div className="pop-up__title">
New image
          </div>
          <InputTitle titleChange={titleChange} />
          <InputUrl urlChange={urlChange} />
          <div className="pop-up__btn-wrapper">
            <ButtonCloseModal toggleModal={toggleModal} />
            <ButtonAddImage
              title={title}
              url={url}
              addImage={addImage}
            />
          </div>
        </div>
      </div>
    );
  }
}

PopUp.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
};


const InputTitle = (props) => {
  const { titleChange } = props;
  return (
    <div>
      <input onChange={titleChange} id="title" placeholder="Title" type="text" />
    </div>
  );
};

InputTitle.propTypes = {
  titleChange: PropTypes.func.isRequired,
};

const InputUrl = (props) => {
  const { urlChange } = props;
  return (
    <div>
      <input onChange={urlChange} id="url" placeholder="URL" type="text" />
    </div>
  );
};

InputUrl.propTypes = {
  urlChange: PropTypes.func.isRequired,
};

const ButtonCloseModal = (props) => {
  const { toggleModal } = props;
  return (
    <div
      className="btn-close"
      onClick={toggleModal}
      onKeyPress={toggleModal}
      tabIndex={0}
      role="button"
    >
Close
    </div>
  );
};

ButtonCloseModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

const ButtonAddImage = (props) => {
  const { addImage, title, url } = props;
  return (
    <div
      className="btn-add"
      onClick={() => addImage(title, url, Date.now())}
      onKeyPress={() => addImage(title, url, Date.now())}
      tabIndex={0}
      role="button"
    >
				Add
    </div>
  );
};

ButtonAddImage.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  addImage: PropTypes.func.isRequired,
};

const Header = () => (
  <header className="page-header">
    <div className="page-header__img" />
    <div className="page-header__title">
					Images
    </div>
  </header>
);
const ButtonOpenModal = (props) => {
  const { toggleModal } = props;
  return (
    <div onClick={toggleModal} onKeyPress={toggleModal} tabIndex={0} role="button" className="btn add-new-img">
				New
    </div>
  );
};

ButtonOpenModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

const ListGallery = (props) => {
  const { appWidth, removeItem, imagesArray } = props;
  const imagesArrayNew = imagesArray.map(item => (
    <ListGalleryItem
      appWidth={appWidth}
      title={item.title}
      url={item.url}
      id={item.id}
      key={item.id}
      removeItem={removeItem}
    />
  ));
  return (
    <div className="list-galery">
      {imagesArrayNew}
    </div>
  );
};

ListGallery.propTypes = {
  imagesArray: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
  appWidth: PropTypes.number,
};
ListGallery.defaultProps = {
  appWidth: 704,
};


class ListGalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileDelete: false,
    };
    this.showMobileDelete = this.showMobileDelete.bind(this);
    this.hiddenMobileDelete = this.hiddenMobileDelete.bind(this);
  }

  showMobileDelete(e) {
    this.setState({
      mobileDelete: true,
    });
    e.stopPropagation();
  }

  hiddenMobileDelete(e) {
    this.setState({
      mobileDelete: false,
    });
    e.stopPropagation();
  }

  render() {
    const {
      id, removeItem, title, url, appWidth,
    } = this.props;
    const { hiddenMobileDelete, showMobileDelete } = this;
    const { mobileDelete } = this.state;
    let mobileDeleteBlock;
    if (mobileDelete && (appWidth < 704)) {
      mobileDeleteBlock = (
        <div className="list-galery__item_mobile-delete_wrapper">
          <div
            className="list-galery__item_mobile-delete_cancel"
            onClick={hiddenMobileDelete}
            onKeyPress={hiddenMobileDelete}
            tabIndex={0}
            role="button"
          >
						Cancel
          </div>
          <div
            className="list-galery__item_mobile-delete"
            onClick={() => removeItem(id)}
            onKeyPress={() => removeItem(id)}
            tabIndex={0}
            role="button"
          >
						Delete
          </div>
        </div>
      );
    }
    return (
      <div className="list-galery__item">
        <ListGalleryItemHeader
          title={title}
          removeItem={removeItem}
          id={id}
        />
        <div
          className="list-galery__item-img"
          onClick={showMobileDelete}
          onKeyPress={showMobileDelete}
          tabIndex={0}
          role="button"
        >
          <img
            src={url}
            alt=""

          />
          {mobileDeleteBlock}
        </div>
      </div>
    );
  }
}

ListGalleryItem.propTypes = {
  appWidth: PropTypes.number,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
};

ListGalleryItem.defaultProps = {
  appWidth: 704,
};

const ListGalleryItemHeader = (props) => {
  const { id, title, removeItem } = props;
  return (
    <div className="list-galery__item-header">
      <div className="list-galery__item-title">
        {title}
      </div>
      <div
        className="list-galery__item_delete"
        onClick={() => removeItem(id)}
        onKeyPress={() => removeItem(id)}
        tabIndex={0}
        role="button"
      >
					Delete
      </div>
    </div>
  );
};

ListGalleryItemHeader.propTypes = {
  title: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      images: [
        {
          title: 'Flower',
          url: 'http://bipbap.ru/wp-content/uploads/2017/09/Cool-High-Resolution-Wallpaper-1920x1080-640x360.jpg',
          id: 1,
        },
        {
          title: 'Mountain',
          url: 'http://www.radionetplus.ru/uploads/posts/2013-05/1369460621_panda-26.jpg',
          id: 2,
        },
      ],
      applicationWidth: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.addImageInArray = this.addImageInArray.bind(this);
    this.removeImageFromArray = this.removeImageFromArray.bind(this);
    this.appWidth = this.appWidth.bind(this);
  }

  appWidth(e) {
    this.setState({
      applicationWidth: e.target.width,
    });
  }

  addImageInArray(title, url, id) {
    const newItem = {
      title,
      url,
      id,
    };

    const { images } = this.state;
    images.unshift(newItem);
    this.setState({
      images,
    });
  }

  removeImageFromArray(key) {
    const { images } = this.state;
    const newArray = images.filter(item => item.id !== key);
    this.setState({ images: newArray });
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  }

  render() {
    const { images, applicationWidth, showModal } = this.state;
    const {
      appWidth, removeImageFromArray, toggleModal, addImageInArray,
    } = this;
    return (
      <div className="app-wrapper" onLoad={appWidth}>
        {showModal
          ? <PopUp toggleModal={toggleModal} addImage={addImageInArray} />
          : null}
        <Header />
        <ButtonOpenModal toggleModal={toggleModal} />
        <ListGallery
          imagesArray={images}
          removeItem={removeImageFromArray}
          appWidth={applicationWidth}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
