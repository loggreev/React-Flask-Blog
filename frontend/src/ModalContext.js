import React, { useState } from 'react';

const ModalContext = React.createContext();
export default ModalContext;

export function ModalContextProvider(props) {
    //the modal that is to be displayed
    const [modalContent, setModalContent] = useState();

    const showModal = (content) => {
        setModalContent(content);
    }
    const hideModal = () => {
        setModalContent();
    }

    return (
        <ModalContext.Provider value={{
            showModal,
            hideModal
        }}>
            <>
                {props.children}
                {modalContent}
            </>
        </ModalContext.Provider>
    );
}