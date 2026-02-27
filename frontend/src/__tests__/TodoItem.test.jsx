import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import TodoItem from '../TodoItem.jsx'
import userEvent from '@testing-library/user-event'


const baseTodo = {             // ** TodoItem พื้นฐานสำหรับทดสอบ
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
};

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../context/AuthContext';

describe('TodoItem ', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    useAuth.mockReturnValue({
      username: 'testuser',
      login: vi.fn(),
      logout: vi.fn(),
    });
  });
  it('renders with no comments correctly', () => {
    render(
      <TodoItem todo={baseTodo} />
    );
    expect(baseTodo.comments.length).toBe(0);

  });

    it('renders with comments correctly', () => {
    const todoWithComment = {
      ...baseTodo,
      comments: [
        {id: 1, message: 'First comment'},
        {id: 2, message: 'Another comment'},
      ]
    };
    render(
      <TodoItem todo={todoWithComment} />
    );
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    //
    // *** TODO: ให้เพิ่ม assertion ว่ามีข้อความ First comment และ Another comment บนหน้าจอ
    //
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Another comment')).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();

  });

    it('does not show no comments message when it has a comment', () => {
    const todoWithComment = [{
      ...baseTodo,
      comments: [
        {id: 1, message: 'First comment'},
      ]
    }];
    render(
      <TodoItem todo={todoWithComment} />
    );
    expect(screen.queryByText('No comments')).not.toBeInTheDocument();
  });
    it('makes callback to toggleDone when Toggle button is clicked', () => {
    const onToggleDone = vi.fn();
    render(
      <TodoItem 
       todo={baseTodo} 
       toggleDone={onToggleDone} />
    );
    const button = screen.getByRole('button', { name: /toggle/i });
    button.click();
    expect(onToggleDone).toHaveBeenCalledWith(baseTodo.id);
  });

    it('makes callback to deleteTodo when delete button is clicked', () => {
        const onToggleDelete = vi.fn();
        render(
            <TodoItem 
            todo={baseTodo} 
            deleteTodo={onToggleDelete} />
        );
        const button = screen.getByRole('button', { name: /❌/i });
        button.click();
        expect(onToggleDelete).toHaveBeenCalledWith(baseTodo.id);

  });
   it('makes callback to addNewComment when a new comment is added', async () => {
    const onAddNewComment = vi.fn();
    render(
            <TodoItem 
            todo={baseTodo} 
            addNewComment={onAddNewComment} />
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input,'New comment');

    const button = screen.getByRole('button', { name: /Add Comment/i });
    button.click();
    expect(onAddNewComment).toHaveBeenCalledWith(baseTodo.id, 'New comment');
  });

});

