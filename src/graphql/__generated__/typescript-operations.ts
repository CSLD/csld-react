export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type CachedGameDataFragment = { __typename?: 'Game' } & Pick<
    Game,
    'id' | 'name' | 'averageRating' | 'amountOfRatings'
>

export type GameDetailCommentFragment = { __typename?: 'Comment' } & Pick<
    Comment,
    'id' | 'added' | 'amountOfUpvotes' | 'comment' | 'isHidden'
> & {
        user: { __typename?: 'User' } & Pick<User, 'id'> & {
                person: { __typename?: 'Person' } & Pick<Person, 'name' | 'nickname'>
                image?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'id'>>
            }
    }

export type GameDetailQueryVariables = Exact<{
    gameId: Scalars['Int']
    commentsLimit: Scalars['Int']
}>

export type GameDetailQuery = { __typename?: 'Query' } & {
    gameById?: Maybe<
        { __typename?: 'Game' } & Pick<
            Game,
            | 'id'
            | 'name'
            | 'players'
            | 'menRole'
            | 'womenRole'
            | 'bothRole'
            | 'hours'
            | 'days'
            | 'year'
            | 'web'
            | 'galleryURL'
            | 'photoAuthor'
            | 'description'
            | 'averageRating'
            | 'amountOfRatings'
            | 'amountOfPlayed'
        > & {
                labels: Array<{ __typename?: 'Label' } & Pick<Label, 'id' | 'name' | 'description'>>
                ratingStats: Array<{ __typename?: 'RatingCount' } & Pick<RatingCount, 'count' | 'rating'>>
                video?: Maybe<{ __typename?: 'Video' } & Pick<Video, 'id' | 'path'>>
                authors: Array<
                    { __typename?: 'User' } & Pick<User, 'id'> & {
                            person: { __typename?: 'Person' } & Pick<Person, 'name' | 'nickname'>
                        }
                >
                groupAuthor: Array<{ __typename?: 'Group' } & Pick<Group, 'id' | 'name'>>
                commentsPaged: { __typename?: 'CommentsPaged' } & Pick<CommentsPaged, 'totalAmount'> & {
                        comments: Array<{ __typename?: 'Comment' } & GameDetailCommentFragment>
                    }
                similarGames: Array<
                    { __typename?: 'Game' } & Pick<Game, 'id' | 'name' | 'averageRating' | 'amountOfRatings' | 'year'>
                >
                gamesOfAuthors: Array<
                    { __typename?: 'Game' } & Pick<Game, 'id' | 'name' | 'averageRating' | 'amountOfRatings' | 'year'>
                >
                events: Array<{ __typename?: 'Event' } & Pick<Event, 'id' | 'name' | 'from' | 'to'>>
            }
    >
}

export type MoreCommentsQueryVariables = Exact<{
    gameId: Scalars['Int']
    commentsOffset: Scalars['Int']
    commentsLimit: Scalars['Int']
}>

export type MoreCommentsQuery = { __typename?: 'Query' } & {
    gameById?: Maybe<
        { __typename?: 'Game' } & Pick<Game, 'id'> & {
                commentsPaged: { __typename?: 'CommentsPaged' } & Pick<CommentsPaged, 'totalAmount'> & {
                        comments: Array<{ __typename?: 'Comment' } & GameDetailCommentFragment>
                    }
            }
    >
}

export type BaseCommentDataFragment = { __typename?: 'Comment' } & Pick<Comment, 'id' | 'commentAsText' | 'added'> & {
        game: { __typename?: 'Game' } & BaseGameDataFragment
        user: { __typename?: 'User' } & Pick<User, 'id'> & {
                person: { __typename?: 'Person' } & Pick<Person, 'name' | 'nickname'>
                image?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'id' | 'path'>>
            }
    }

export type GetHomePageDataQueryVariables = Exact<{ [key: string]: never }>

export type GetHomePageDataQuery = { __typename?: 'Query' } & {
    homepage: { __typename?: 'Homepage' } & {
        lastAddedGames: Array<{ __typename?: 'Game' } & BaseGameDataFragment>
        mostPopularGames: Array<{ __typename?: 'Game' } & BaseGameDataFragment>
        nextEvents: Array<
            { __typename?: 'Event' } & Pick<Event, 'id' | 'name' | 'from' | 'to' | 'loc' | 'amountOfPlayers'>
        >
        lastComments: Array<{ __typename?: 'Comment' } & BaseCommentDataFragment>
    }
}

export type GetMoreLastCommentsQueryVariables = Exact<{
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
}>

export type GetMoreLastCommentsQuery = { __typename?: 'Query' } & {
    homepage: { __typename?: 'Homepage' } & {
        lastComments: Array<{ __typename?: 'Comment' } & BaseCommentDataFragment>
    }
}

export type SearchGamesQueryVariables = Exact<{
    searchTerm: Scalars['String']
    limit: Scalars['Int']
}>

export type SearchGamesQuery = { __typename?: 'Query' } & {
    gamesBySearchTerm: Array<{ __typename?: 'Game' } & BaseGameDataFragment>
}

export type BaseGameDataFragment = { __typename?: 'Game' } & Pick<
    Game,
    'id' | 'name' | 'players' | 'averageRating' | 'amountOfComments' | 'amountOfRatings'
>

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type Query = {
    __typename?: 'Query'
    homepage: Homepage
    gameById?: Maybe<Game>
    gamesBySearchTerm: Array<Game>
}

export type QueryGameByIdArgs = {
    id: Scalars['Int']
}

export type QueryGamesBySearchTermArgs = {
    searchTerm: Scalars['String']
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
}

export type Homepage = {
    __typename?: 'Homepage'
    lastAddedGames: Array<Game>
    mostPopularGames: Array<Game>
    lastComments: Array<Comment>
    nextEvents: Array<Event>
}

export type HomepageLastCommentsArgs = {
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
}

export type Game = {
    __typename?: 'Game'
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    year?: Maybe<Scalars['Int']>
    web?: Maybe<Scalars['String']>
    hours?: Maybe<Scalars['Int']>
    days?: Maybe<Scalars['Int']>
    players?: Maybe<Scalars['Int']>
    menRole?: Maybe<Scalars['Int']>
    womenRole?: Maybe<Scalars['Int']>
    bothRole?: Maybe<Scalars['Int']>
    totalRating: Scalars['Float']
    averageRating: Scalars['Float']
    added: Scalars['String']
    amountOfComments: Scalars['Int']
    amountOfPlayed: Scalars['Int']
    amountOfRatings: Scalars['Int']
    galleryURL?: Maybe<Scalars['String']>
    photoAuthor?: Maybe<Scalars['String']>
    deleted?: Maybe<Scalars['Boolean']>
    ratingsDisabled?: Maybe<Scalars['Boolean']>
    commentsDisabled?: Maybe<Scalars['Boolean']>
    labels: Array<Label>
    comments: Array<Comment>
    commentsPaged: CommentsPaged
    authors: Array<User>
    groupAuthor: Array<Group>
    ratings: Array<Rating>
    ratingStats: Array<RatingCount>
    wantsToPlay: Array<User>
    similarGames: Array<Game>
    gamesOfAuthors: Array<Game>
    events: Array<Event>
    video?: Maybe<Video>
    coverImage?: Maybe<Image>
    photos: Array<Photo>
    /** Are these needed? */
    blueprintPath?: Maybe<Scalars['String']>
}

export type GameCommentsPagedArgs = {
    offset: Scalars['Int']
    limit: Scalars['Int']
}

export type CommentsPaged = {
    __typename?: 'CommentsPaged'
    comments: Array<Comment>
    totalAmount: Scalars['Int']
}

export type Event = {
    __typename?: 'Event'
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    loc?: Maybe<Scalars['String']>
    web?: Maybe<Scalars['String']>
    deleted?: Maybe<Scalars['Boolean']>
    amountOfPlayers: Scalars['Int']
    from?: Maybe<Scalars['String']>
    to?: Maybe<Scalars['String']>
    location?: Maybe<EventLocation>
    labels?: Maybe<Array<Label>>
    games?: Maybe<Array<Game>>
}

export type EventLocation = {
    __typename?: 'EventLocation'
    lattitude: Scalars['Float']
    longtitude: Scalars['Float']
}

export type Label = {
    __typename?: 'Label'
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    isRequired?: Maybe<Scalars['Boolean']>
    isAuthorized?: Maybe<Scalars['Boolean']>
}

export type Person = {
    __typename?: 'Person'
    name: Scalars['String']
    description?: Maybe<Scalars['String']>
    email: Scalars['String']
    nickname?: Maybe<Scalars['String']>
    birthDate?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
}

export type Image = {
    __typename?: 'Image'
    id: Scalars['ID']
    path?: Maybe<Scalars['String']>
    contentType?: Maybe<Scalars['String']>
}

export type User = {
    __typename?: 'User'
    id: Scalars['ID']
    lastRating?: Maybe<Scalars['Int']>
    role?: Maybe<Scalars['Int']>
    person: Person
    amountOfComments: Scalars['Int']
    amountOfPlayed: Scalars['Int']
    amountOfCreated: Scalars['Int']
    image?: Maybe<Image>
    commented: Array<Comment>
}

export type Comment = {
    __typename?: 'Comment'
    id: Scalars['ID']
    comment?: Maybe<Scalars['String']>
    commentAsText?: Maybe<Scalars['String']>
    added?: Maybe<Scalars['String']>
    isHidden?: Maybe<Scalars['Boolean']>
    amountOfUpvotes: Scalars['Int']
    game: Game
    user: User
}

export type Group = {
    __typename?: 'Group'
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
    authorsOf: Array<Game>
}

export type Rating = {
    __typename?: 'Rating'
    id: Scalars['ID']
    rating?: Maybe<Scalars['Int']>
    state?: Maybe<Scalars['Int']>
    game: Game
    user: User
}

export type RatingCount = {
    __typename?: 'RatingCount'
    rating: Scalars['Int']
    count: Scalars['Int']
}

export type Video = {
    __typename?: 'Video'
    id: Scalars['ID']
    path?: Maybe<Scalars['String']>
}

export type Photo = {
    __typename?: 'Photo'
    id: Scalars['ID']
    orderSeq?: Maybe<Scalars['Int']>
    description?: Maybe<Scalars['String']>
    fullWidth: Scalars['Int']
    fullHeight: Scalars['Int']
    featured: Scalars['Boolean']
    game: Game
    image: Image
}
