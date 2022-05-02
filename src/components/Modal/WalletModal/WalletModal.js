import MetamaskModal from "../MetamaskModal/MetamaskModal";
import ChooseWalletModal from "../ChooseWalletModal/ChooseWalletModal";

const WalletModal = ({modalMode, setModalMode}) => {
    if (modalMode===0) {
        return <MetamaskModal setModalMode={setModalMode}/>
    } else {
        return <ChooseWalletModal />
    }
}

export default WalletModal;
