import Head from 'next/head';
import TodoList from './components/todolist';

export default function Home() {

    return (
        <div>
            <Head>
                <title>To-Do List</title>
                <meta
                    name="description"
                    content="A simple to-do list application created with Next.js and MySQL"
                />
                <link rel="icon" href="/todo-list.ico" />
            </Head>
            <TodoList />
        </div>
    );
}
