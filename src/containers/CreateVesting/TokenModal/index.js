import React from 'react';
import { Button } from 'antd';
import Modal from "@material-ui/core/Modal";
import "./index.scss";

import EtherLogo from '../../../assets/ethereum-logo.svg';

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