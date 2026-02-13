import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import  App  from '../App.jsx'

const baseTodo = {             // ** TodoItem พื้นฐานสำหรับทดสอบ
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
};

describe('App', () => {
  it('renders with no comments correctly', () => {
    render(
      <App todo={[baseTodo]} />
    );
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
  });

    it('renders with comments correctly', () => {
    const todoWithComment = [{
      ...baseTodo,
      comments: [
        {id: 1, message: 'First comment'},
        {id: 2, message: 'Another comment'},
      ]
    }];
    render(
      <App todo={todoWithComment} />
    );
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    //
    // *** TODO: ให้เพิ่ม assertion ว่ามีข้อความ First comment และ Another comment บนหน้าจอ
    //
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Another comment')).toBeInTheDocument();
  });

});

