import { Component, createSignal, createEffect } from "solid-js"

const S3: Component = () => {
  const [images, setImages] = createSignal(null)

  createEffect(async () => {
    const response = await fetch("http://localhost:8080/api/homes/v1/listing")
    setImages(await response.json())
  })

  return (
    <For each={images()}>
      {image => (
        <img src={`http://localhost:4566/test-bucket/${image.key}`}></img>
      )}
    </For>
  )
}

export default S3
