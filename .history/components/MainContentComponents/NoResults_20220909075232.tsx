import React from 'react'

interface IProps {
  text: string;
}

const NoResults:React.FC<IProps> = ({text}) => {
  return (
    <div>{text}</div>
  )
}

export default NoResults