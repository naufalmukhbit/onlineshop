import { Container } from 'react-bootstrap'
import Header from './header'
export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Container>
                {children}
            </Container>
        </>
    )
}