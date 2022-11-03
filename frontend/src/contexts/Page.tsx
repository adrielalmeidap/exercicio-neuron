import { createContext, useContext, useState} from 'react';

export enum Page{
    Articles = 'Articles',
    Authors = 'Authors',
}

type ContextType = {
    page: Page;
    setPage: (page: Page) => void;
}

type Props = {
    children: React.ReactNode
 }

const Context = createContext<ContextType>({
    page: Page.Articles,
    setPage: (page: Page) => console.warn('no page provider'),
});

export const usePage = () => useContext(Context);

export const PageStore: React.FC<Props> = ({ children }) => {
    const [page, setPage] = useState(Page.Articles);
    return (
        <Context.Provider value={{ page, setPage }}>{ children }</Context.Provider>
    );
};
