import Proptypes from 'prop-types'
import './GlobalStyles.scss'

const GlobalStyles = ({ children }) => {
    return children
}

GlobalStyles.propTypes = {
    children: Proptypes.node.isRequired,
}

export default GlobalStyles
