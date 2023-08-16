export const InputForm = (props) => {
  const { inputValue, handleChangeValue, handleKeyDown, placeholder } = props;

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChangeValue}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  )
}