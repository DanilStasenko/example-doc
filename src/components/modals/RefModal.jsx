import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import {useLocation, useHistory} from '@docusaurus/router';

const RefModal = ({children, path}) => {
    const [showModal, setShowModal] = useState(false)
    const modalRef = useRef(null)

    const location = useLocation()
    const history = useHistory()


    const handleOpenModal = () => {
        if (window.parent !== window) {

            history.push(path.includes('#') ? path : path + '?only_content=true')
        } else {
            setShowModal(true)
        }
    }

    const handleOutsideCloseModal = (e) => {
        if (e.target.id === 'refModal') handleCloseModal()
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        if (showModal) {
            document.addEventListener('click', handleOutsideCloseModal);
        } else {
            document.removeEventListener('click', handleOutsideCloseModal);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideCloseModal);
        };
    }, [showModal]);

    useEffect(() => {
        const iframe = document.querySelector('iframe')

        if (location.search.includes('only_content') || location.hash.length) {
            const el = window.document.getElementById('__docusaurus')
            el.classList.add(styles.hidden)
        }

        if (iframe) {

            if (path.indexOf('#') !== -1) {
                iframe.addEventListener('load', () => {
                    iframe.src = path
                })
            }
        }
    })

    return (
        <span className={styles.layout}>
            <span onClick={handleOpenModal} className={styles.clickable}>
                {children}
            </span>
            {showModal && (
                <div ref={modalRef} className={styles.modal} id={'refModal'}>
                    <div className={styles['modal-content']}>
                        <div className={styles['modal-header']}>
                            <h2>Справка</h2>
                            <p className={styles.close} onClick={handleCloseModal}>
                              &times;
                            </p>
                        </div>
                        <iframe className={styles.frame} src={path.split('#')[0] + '?only_content=true'} frameborder="0"></iframe>
                    </div>
                </div>
            )}
        </span>
    );
};

export default RefModal;