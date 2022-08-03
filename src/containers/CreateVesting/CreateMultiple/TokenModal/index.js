import React from 'react';
import Modal from "@material-ui/core/Modal";
import "./index.scss";

import EtherLogo from '../../../../assets/ethereum-logo.svg';

const TokenModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="form-item" onClick={handleOpen}>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                    Token
                </label>
                <div className="token-select formfeilds">
                    <div className="text-placeholder">Select a currency</div>
                    {/* <div className="text-placeholder">Select a currency</div> */}
                </div>
            </div>
            <div className="selectcurrency" onClick={handleOpen}>
                Select
                <svg width="23.616" height="13.503" viewBox="0 0 23.616 13.503">
                    <path d="M18,20.679l8.93-8.937a1.681,1.681,0,0,1,2.384,0,1.7,1.7,0,0,1,0,2.391L19.2,24.258a1.685,1.685,0,0,1-2.327.049L6.68,14.14a1.688,1.688,0,0,1,2.384-2.391Z" transform="translate(-6.188 -11.246)" />
                </svg>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='token-selectmodal'
            >
                <div className='token-selectmodal-inner'>
                    <div className='title'>Select Token</div>
                    <div className='search-token'>
                        <input placeholder='Address or ENS name' />
                    </div>
                    <h4 className='token-title'>Wallet Balances</h4>
                    <ul className='token-list'>
                        <li>
                            <div className='left-col'>
                                <div className='icons'>
                                    <img src={EtherLogo} />
                                </div>
                                <div>
                                    <p>RIN</p>
                                    <small>Rinkeby Ether</small>
                                </div>
                            </div>
                            <div className='right-col'>0.00854</div>
                        </li>
                        <li>
                            <div className='left-col'>
                                <div className='icons'>
                                    <img src={EtherLogo} />
                                </div>
                                <div>
                                    <p>RIN</p>
                                    <small>Rinkeby Ether</small>
                                </div>
                            </div>
                            <div className='right-col'>0.00854</div>
                        </li>
                        <li>
                            <div className='left-col'>
                                <div className='icons'>
                                    <img src={EtherLogo} />
                                </div>
                                <div>
                                    <p>RIN</p>
                                    <small>Rinkeby Ether</small>
                                </div>
                            </div>
                            <div className='right-col'>0.00854</div>
                        </li>
                        <li>
                            <div className='left-col'>
                                <div className='icons'>
                                    <img src={EtherLogo} />
                                </div>
                                <div>
                                    <p>RIN</p>
                                    <small>Rinkeby Ether</small>
                                </div>
                            </div>
                            <div className='right-col'>0.00854</div>
                        </li>
                        <li>
                            <div className='left-col'>
                                <div className='icons'>
                                    <img src={EtherLogo} />
                                </div>
                                <div>
                                    <p>RIN</p>
                                    <small>Rinkeby Ether</small>
                                </div>
                            </div>
                            <div className='right-col'>0.00854</div>
                        </li>
                        <li>
                            <div className='left-col'>
                                <div className='icons'>
                                    <img src={EtherLogo} />
                                </div>
                                <div>
                                    <p>RIN</p>
                                    <small>Rinkeby Ether</small>
                                </div>
                            </div>
                            <div className='right-col'>0.00854</div>
                        </li>
                    </ul>
                </div>
            </Modal>
        </>
    )
}

export default TokenModal;