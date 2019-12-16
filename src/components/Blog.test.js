import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Game of Throne',
    author: 'Dat Vu',
    url: 'http://www.yahoo.com',
    likes: '17'
  }

  beforeEach(() => {
    component = render(
      <Blog content={blog} />
    )
  })

  test('renders blog title', () => {
    expect(component.container).toHaveTextContent(
      'Game of Throne'
    )
  })

  test('renders blog author', () => {
    expect(component.container).toHaveTextContent(
      'Dat Vu'
    )
  })

  test('at start the additional info is not displayed', () => {
    const div = component.container.querySelector('.additional-info')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the title, additional info is displayed', () => {
    const title = component.container.querySelector('.title')
    fireEvent.click(title)

    const div = component.container.querySelector('.additional-info')
    expect(div).not.toHaveStyle('display: none')
  })

})
