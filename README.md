# Nitflix

> ### Bringing Netflix's Smart TV browsing experience on the web.

Not your typical Netflix clone. Made with Next.js, Typescript, [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) + [openapi-ts](https://heyapi.vercel.app/), Axios, React Query, TailwindCSS, Zustand and Framer Motion.

**Check out the [Live Demo!](https://nitflix-six.vercel.app/)**

Status: In Progress 🚧

## Dev Logs

- Okay, this time this Next.js project will fetch data from TMDB API instead having a database (Tbh I don't want the hassle to find and insert hundreds of movie data into the db). I'm using Next.js to provide user with improved UX. SSR comes with the benefit of faster First-Contentful-Paint (FCP), faster Time-To-Interactive (TTI) and smaller JS bundle size. (But the actual reason I'm using Next.js was because of the file-based routing lol 🤭). So which part to SSR? The header and footer, duh... Will my project have one? I don't know yet.

- I wanted to setup react-query and axios since I'm gonna call external API. So I'm just gonna wrap the root layout's children with react-query provider (`QueryClientProvider`), and put `use client` on top. But react-query is client component. Since the parent/wrapper is client component, all the child underneath it will be client component too. This will defeat the purpose of Next.js which is to use SSR! The solution is to refactor out `QueryClientProvider` into it's own component file (I call it `ReactQueryProvider`), then add the `use client` in it. Lastly, wrap the root layout with `ReactQueryProvider`.

  - Wait a minute... the provider is still client component, everything that it wraps will still be client too right? Nope. Because..... It was a little hard to explain, but I managed to understand it from [this article](https://www.joshwcomeau.com/react/server-components/#workarounds-7).

- When working with API, it is very helpful to have the types. It provides autocomplete, reduce erros and make an app more scalable. TMDB API provided an Open API Specification (OAS) for their api. I found there's a few libraries that can generate types based on OAS. After careful consideration and in-depth research, I decided to choose [hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) (Actually I chose it because the logo looks cute 😆).

  - The docs explained how to set it up, but it's too generic. I don't really understand how to fit it in the context of my project. Luckily they provide an example in StackBlitz and I managed to get things working.
  - I created hey-api axios client globally, but the base URL still points to `localhost:3000` instead of `https://api.themoviedb.org`. Hence, need to pass the client to every place that invoke the api call. I'll need to create a custom hook for my react-query to automatically include the axios client. Also planning to standardize error handling inside the hook too.
  - Btw, since hey-api's axios client still in beta, the error response was `unknown` instead of `AxiosError` type. Still need to do `if (error instanceof AxiosError)` for error handling. What a bummer.
  - The response from `trendingAll` endpoint was `TrendingAllResponse`, which contains `results: Array<object_fields>`. The object doesn't abstracted to type `Movie`. I want to select one random movie from the response and put it in a state. So what's type of my state should be? I asked ChatGPT and it suggested to abstract it to type `Movie` myself. But I don't want to do that. Then it suggested me this: `TrendingAllResponse["results"][number]`. But I got TS error that says `'results' may be undefined`. Then it suggest me this:

  - ```
    // Using type assertion
    type Movie = NonNullable<TrendingAllResponse["results"]>[number];

    // Using uses conditional types
    type Movie = TrendingMovies['results'] extends Array<infer U> ? U : never;
    ```

    - ☝️ I was mind-blown. Didn't know TS can do this! (But in the end I still created the `Movie` type myself because exporting the `TrendingAllResponse` to other components that have nothing to do with `TrendingAllResponse` sounds like a code smell. E.g: What if the response from TopRatedMoviesResponse is sligthly different? Then I'll be forced to create a union type to add-on the extra fields).

  - > But there's one thing that's bugging me: Should I add the codegen to my .gitignore?

  - I just realized that `hey-api/openapi-ts` was client component. No wonder my `@hey-api/client-axios` doesn't work when I instantiate it in my root layout (since the layout only runs on server by default). So I just put it in `ReactQueryProvider` since it's already have `use client` on top and I'm too lazy to create another wrapper.

- When using Nextjs's `Image` component without the `fill` props, Nextjs will error out and says that `width` and `height` props are required. These props will be used to infer aspect ratio to prevent "layout shifts". So I just put 100:200 since it's a reasonable aspect ratio for posters. But then Nextjs spit out warnings that "... include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio". I obeyed and put in the CSS. Unfortunately the warning persisted. Since I have hundreds of posters rendered, my Console was lagging out. Turns out there was a [bug](https://github.com/vercel/next.js/issues/56025) on the `Image` component. Nextjs please fix 😢. Currently I'll just do this [workaround](https://www.reddit.com/r/nextjs/comments/16yvihk/seriously_why_is_it_so_difficult_to_use_image_and/):
  ```
  <Image
    src={
      TMDB_IMAGE_BASE_URL +
      (movie.poster_path || movie.backdrop_path)?.substring(1)
    }
    alt={`Poster for ${getMovieTitle(movie)}`}
    width={1}
    height={2}
    className="h-full w-auto object-cover"
    sizes="(max-width: 768px) 33vw, 10vw"
  />
  ```
- By adding the scroll fade blend and snappy scroll, it makes the app looks stunning! This is the Smart TV exprience I'm talking about 😆. Can't wait for the final version.

- Funny story: I wanted to flip the Netflix logo to prevent copyright issue. So I used `rotate-180`. It was this moment that I learnt that the letter "N" will always looks the same no matter you rotate it 180 degree clockwise or counter-clockwise 🤯. So rotate doesn't work. I googled how to "flip image in CSS" and encountered [this article](https://pqina.nl/blog/flipping-images-with-css-and-javascript/). It uses `scale-y` set to -1, which will flip an image due to point reflection.

  - So I used that same flipped logo on the splash screen. The reason for the splash screen is because ["As of Chrome 66, videos must be muted in order to play automatically"](https://www.npmjs.com/package/react-player#autoplay). Hence I need to force user to click something on the website so that video will autoplay without being muted. I've implemented the click, but it loads for a few seconds before navigating to the homepage. So... I need a loading spinner! But since I'm lazy, I'll just use `animate-spin` on the logo so it will spin indefinitely. However, since the logo was flipped, it spins forwards towards the screen instead of spinning like a normal loading spinner 🤣🤣🤣. I looked at it for the for the first time and laughed so hard. It looks stupid, but I'll keep it there. One of the unexpected moments in my CSS journey.

- Tried to make it mobile responsive, but it kinda sucked LOL. I didn't design it mobile-first since my goal was to re-create that gradient-blend-scroll-fade thing when scrolling movies, and unfortunately the scroll fade thing doesn't fit well with mobile screen. Maybe will revamp the mobile UI in the future.

## References

- [This video](https://www.youtube.com/watch?v=4eeoleNpEL8) inspired me to blend in the YouTube player in the hero section instead of playing the trailer in a modal like other tutorials do. I didn't follow along his tutorial, but his energy is amazing!
  - _"See this, guys. This is amazing! - Patel MernStack, 2024"_
- Can't find a way to make that seamless gradient-blend-scroll-fade thing in Stack Overflow. Fortunately, [found this video](https://www.youtube.com/watch?v=mF9yOwlunWk) from _Lun Dev Code_'s channel. His videos never disappoints.
  - Btw his channel has bunch of awesome CSS videos. Don't forget to check it out!
- Netflix logo: [Source](https://www.pngwing.com/en/free-png-adjxw/download)
