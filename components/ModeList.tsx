import React from 'react'
import useSWR from 'swr'
import Select from 'react-select'

const fetcher = () => fetch('/api/getEngines').then(res => res.json())

function ModeList() {
  const { data: models, error, isLoading } = useSWR('models', fetcher)

  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'gpt-3.5-turbo'
  })
  console.log(models?.modelOptions)
  return (
    <div>
      <Select
        defaultValue={model}
        options={models?.modelOptions}
        placeholder={model}
        isSearchable
        menuPosition='fixed'
        className='mt-2 bg-[#434654] border-[#434654]'
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'gray',
            primary: 'black',
          },
        })}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  )
}

export default ModeList