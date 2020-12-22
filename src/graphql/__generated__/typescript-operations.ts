export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type CachedGameDataFragment = { __typename?: 'Game' } & Pick<
    Game,
    'id' | 'name' | 'averageRating' | 'amountOfRatings'
>

export type DeleteRatingMutationVariables = Exact<{
    gameId: Scalars['ID']
    userId: Scalars['ID']
}>

export type DeleteRatingMutation = { __typename?: 'Mutation' } & {
    game: { __typename?: 'GameMutation' } & { deleteGameRating: { __typename?: 'Game' } & Pick<Game, 'id'> }
}

export type GameDetailQueryVariables = Exact<{
    gameId: Scalars['ID']
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
                coverImage?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'id'>>
                currentUsersRating?: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'id' | 'rating' | 'state'>>
                labels: Array<{ __typename?: 'Label' } & Pick<Label, 'id' | 'name' | 'description'>>
                ratingStats: Array<{ __typename?: 'RatingCount' } & Pick<RatingCount, 'count' | 'rating'>>
                video?: Maybe<{ __typename?: 'Video' } & Pick<Video, 'id' | 'path'>>
                authors: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'nickname'>>
                groupAuthor: Array<{ __typename?: 'Group' } & Pick<Group, 'id' | 'name'>>
                similarGames: Array<
                    { __typename?: 'Game' } & Pick<Game, 'id' | 'name' | 'averageRating' | 'amountOfRatings' | 'year'>
                >
                gamesOfAuthors: Array<
                    { __typename?: 'Game' } & Pick<Game, 'id' | 'name' | 'averageRating' | 'amountOfRatings' | 'year'>
                >
                events: Array<{ __typename?: 'Event' } & Pick<Event, 'id' | 'name' | 'from' | 'to'>>
                ratings: Array<
                    { __typename?: 'Rating' } & Pick<Rating, 'id' | 'rating'> & {
                            user: { __typename?: 'User' } & Pick<User, 'id' | 'name'>
                        }
                >
            }
    >
}

export type MoreCommentsQueryVariables = Exact<{
    gameId: Scalars['ID']
    commentsOffset: Scalars['Int']
    commentsLimit: Scalars['Int']
}>

export type MoreCommentsQuery = { __typename?: 'Query' } & {
    gameById?: Maybe<
        { __typename?: 'Game' } & Pick<Game, 'id'> & {
                commentsPaged: { __typename?: 'CommentsPaged' } & Pick<CommentsPaged, 'totalAmount'> & {
                        comments: Array<{ __typename?: 'Comment' } & GameDetailCommentFragment>
                    }
                currentUsersComment?: Maybe<{ __typename?: 'Comment' } & Pick<Comment, 'id' | 'comment'>>
            }
    >
}

export type RefetchGameRatingQueryVariables = Exact<{
    gameId: Scalars['ID']
}>

export type RefetchGameRatingQuery = { __typename?: 'Query' } & {
    gameById?: Maybe<
        { __typename?: 'Game' } & {
            currentUsersRating?: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'id' | 'rating' | 'state'>>
            ratingStats: Array<{ __typename?: 'RatingCount' } & Pick<RatingCount, 'count' | 'rating'>>
        }
    >
}

export type UpdateCommentMutationVariables = Exact<{
    gameId: Scalars['ID']
    comment: Scalars['String']
}>

export type UpdateCommentMutation = { __typename?: 'Mutation' } & {
    game: { __typename?: 'GameMutation' } & { createOrUpdateComment: { __typename?: 'Game' } & Pick<Game, 'id'> }
}

export type UpdateGameRatingMutationVariables = Exact<{
    gameId: Scalars['ID']
    rating: Scalars['Int']
}>

export type UpdateGameRatingMutation = { __typename?: 'Mutation' } & {
    game: { __typename?: 'GameMutation' } & { rateGame: { __typename?: 'Game' } & Pick<Game, 'id'> }
}

export type UpdateGameStateMutationVariables = Exact<{
    gameId: Scalars['ID']
    state: Scalars['Int']
}>

export type UpdateGameStateMutation = { __typename?: 'Mutation' } & {
    game: { __typename?: 'GameMutation' } & { setGamePlayedState: { __typename?: 'Game' } & Pick<Game, 'id'> }
}

export type CreateGroupMutationVariables = Exact<{
    input: CreateGroupInput
}>

export type CreateGroupMutation = { __typename?: 'Mutation' } & {
    group: { __typename?: 'GroupMutation' } & { createGroup: { __typename?: 'Group' } & Pick<Group, 'id'> }
}

export type LoadGroupQueryVariables = Exact<{
    groupId: Scalars['ID']
}>

export type LoadGroupQuery = { __typename?: 'Query' } & {
    groupById?: Maybe<
        { __typename?: 'Group' } & Pick<Group, 'id' | 'name'> & {
                authorsOf: Array<{ __typename?: 'Game' } & BaseGameDataFragment>
            }
    >
}

export type UpdateGroupMutationVariables = Exact<{
    input: UpdateGroupInput
}>

export type UpdateGroupMutation = { __typename?: 'Mutation' } & {
    group: { __typename?: 'GroupMutation' } & { updateGroup: { __typename?: 'Group' } & Pick<Group, 'id'> }
}

export type BaseCommentDataFragment = { __typename?: 'Comment' } & Pick<Comment, 'id' | 'commentAsText' | 'added'> & {
        game: { __typename?: 'Game' } & BaseGameDataFragment
        user: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'nickname'> & {
                image?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'id' | 'path'>>
            }
    }

export type GetHomePageDataQueryVariables = Exact<{ [key: string]: never }>

export type GetHomePageDataQuery = { __typename?: 'Query' } & {
    homepage: { __typename?: 'HomepageQuery' } & {
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
    homepage: { __typename?: 'HomepageQuery' } & {
        lastComments: Array<{ __typename?: 'Comment' } & BaseCommentDataFragment>
    }
}

export type ChangePasswordMutationVariables = Exact<{
    oldPassword: Scalars['String']
    newPassword: Scalars['String']
}>

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
    user: { __typename?: 'UserMutation' } & { updateLoggedInUserPassword: { __typename?: 'User' } & Pick<User, 'id'> }
}

export type UserProfileDataFragment = { __typename?: 'User' } & Pick<
    User,
    'id' | 'amountOfPlayed' | 'amountOfCreated' | 'email' | 'name' | 'nickname' | 'birthDate' | 'city'
> & {
        image?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'id'>>
        authoredGames: Array<{ __typename?: 'Game' } & BaseGameDataFragment>
        playedGames: Array<
            { __typename?: 'GameWithRating' } & Pick<GameWithRating, 'rating'> & {
                    game: { __typename?: 'Game' } & Pick<Game, 'year'> & BaseGameDataFragment
                }
        >
        wantedGames: Array<{ __typename?: 'Game' } & Pick<Game, 'year'> & BaseGameDataFragment>
    }

export type LoadCurrentUserProfileQueryVariables = Exact<{
    commentsLimit: Scalars['Int']
}>

export type LoadCurrentUserProfileQuery = { __typename?: 'Query' } & {
    loggedInUser?: Maybe<
        { __typename?: 'User' } & {
            commentsPaged: { __typename?: 'CommentsPaged' } & Pick<CommentsPaged, 'totalAmount'> & {
                    comments: Array<
                        { __typename?: 'Comment' } & {
                            game: { __typename?: 'Game' } & BaseGameDataFragment
                        } & GameDetailCommentFragment
                    >
                }
        } & UserProfileDataFragment
    >
}

export type LoadCurrentUserSettingsQueryVariables = Exact<{ [key: string]: never }>

export type LoadCurrentUserSettingsQuery = { __typename?: 'Query' } & {
    loggedInUser?: Maybe<
        { __typename?: 'User' } & Pick<
            User,
            'id' | 'amountOfPlayed' | 'amountOfCreated' | 'email' | 'name' | 'nickname' | 'birthDate' | 'city'
        > & { image?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'id'>> }
    >
}

export type LoadUserProfileQueryVariables = Exact<{
    userId: Scalars['ID']
    commentsLimit: Scalars['Int']
}>

export type LoadUserProfileQuery = { __typename?: 'Query' } & {
    loggedInUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
    userById?: Maybe<
        { __typename?: 'User' } & {
            commentsPaged: { __typename?: 'CommentsPaged' } & Pick<CommentsPaged, 'totalAmount'> & {
                    comments: Array<
                        { __typename?: 'Comment' } & {
                            game: { __typename?: 'Game' } & BaseGameDataFragment
                        } & GameDetailCommentFragment
                    >
                }
        } & UserProfileDataFragment
    >
}

export type MoreUserCommentsQueryVariables = Exact<{
    userId: Scalars['ID']
    offset: Scalars['Int']
    limit: Scalars['Int']
}>

export type MoreUserCommentsQuery = { __typename?: 'Query' } & {
    userById?: Maybe<
        { __typename?: 'User' } & {
            commentsPaged: { __typename?: 'CommentsPaged' } & Pick<CommentsPaged, 'totalAmount'> & {
                    comments: Array<
                        { __typename?: 'Comment' } & {
                            game: { __typename?: 'Game' } & BaseGameDataFragment
                        } & GameDetailCommentFragment
                    >
                }
        }
    >
}

export type UpdateUserSettingsMutationVariables = Exact<{
    input: UpdateLoggedInUserInput
}>

export type UpdateUserSettingsMutation = { __typename?: 'Mutation' } & {
    user: { __typename?: 'UserMutation' } & { updateLoggedInUser: { __typename?: 'User' } & Pick<User, 'id'> }
}

export type FinishRecoverPasswordMutationVariables = Exact<{
    newPassword: Scalars['String']
    token: Scalars['String']
}>

export type FinishRecoverPasswordMutation = { __typename?: 'Mutation' } & {
    user: { __typename?: 'UserMutation' } & {
        finishRecoverPassword?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
    }
}

export type StartRecoverPasswordMutationVariables = Exact<{
    email: Scalars['String']
    recoverUrl: Scalars['String']
}>

export type StartRecoverPasswordMutation = { __typename?: 'Mutation' } & {
    user: { __typename?: 'UserMutation' } & Pick<UserMutation, 'startRecoverPassword'>
}

export type LogInMutationVariables = Exact<{
    userName: Scalars['String']
    password: Scalars['String']
}>

export type LogInMutation = { __typename?: 'Mutation' } & {
    user: { __typename?: 'UserMutation' } & { logIn?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>> }
}

export type CreateUserMutationVariables = Exact<{
    input: CreateUserInput
}>

export type CreateUserMutation = { __typename?: 'Mutation' } & {
    user: { __typename?: 'UserMutation' } & { createUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>> }
}

export type GetConfigQueryVariables = Exact<{ [key: string]: never }>

export type GetConfigQuery = { __typename?: 'Query' } & {
    config: { __typename?: 'Config' } & Pick<Config, 'reCaptchaKey'>
}

export type SearchGamesQueryVariables = Exact<{
    searchTerm: Scalars['String']
    limit: Scalars['Int']
}>

export type SearchGamesQuery = { __typename?: 'Query' } & {
    games: { __typename?: 'GamesQuery' } & { bySearchTerm: Array<{ __typename?: 'Game' } & BaseGameDataFragment> }
}

export type SignOutMutationVariables = Exact<{ [key: string]: never }>

export type SignOutMutation = { __typename?: 'Mutation' } & {
    user: { __typename?: 'UserMutation' } & { logOut?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>> }
}

export type SetCommentVisibleMutationVariables = Exact<{
    commentId: Scalars['ID']
    visible: Scalars['Boolean']
}>

export type SetCommentVisibleMutation = { __typename?: 'Mutation' } & {
    game: { __typename?: 'GameMutation' } & { setCommentVisible: { __typename?: 'Game' } & Pick<Game, 'id'> }
}

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never }>

export type LoggedInUserQuery = { __typename?: 'Query' } & {
    loggedInUser?: Maybe<
        { __typename?: 'User' } & Pick<User, 'id' | 'role' | 'name' | 'nickname'> & {
                image?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'id'>>
            }
    >
}

export type BaseGameDataFragment = { __typename?: 'Game' } & Pick<
    Game,
    'id' | 'name' | 'players' | 'averageRating' | 'amountOfComments' | 'amountOfRatings'
>

export type GameDetailCommentFragment = { __typename?: 'Comment' } & Pick<
    Comment,
    'id' | 'added' | 'amountOfUpvotes' | 'comment' | 'isHidden'
> & {
        user: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'nickname'> & {
                image?: Maybe<{ __typename?: 'Image' } & Pick<Image, 'id'>>
            }
    }

export type CheckEmailQueryVariables = Exact<{
    email: Scalars['String']
}>

export type CheckEmailQuery = { __typename?: 'Query' } & {
    userByEmail?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>
}

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
    homepage: HomepageQuery
    loggedInUser?: Maybe<User>
    gameById?: Maybe<Game>
    groupById?: Maybe<Group>
    eventById?: Maybe<Event>
    userById?: Maybe<User>
    userByEmail?: Maybe<User>
    games: GamesQuery
    authorizedRequiredLabels: Array<Label>
    authorizedOptionalLabels: Array<Label>
    admin: AdminQuery
    donations: Array<Donation>
    config: Config
}

export type QueryGameByIdArgs = {
    gameId: Scalars['ID']
}

export type QueryGroupByIdArgs = {
    groupId: Scalars['ID']
}

export type QueryEventByIdArgs = {
    eventId: Scalars['ID']
}

export type QueryUserByIdArgs = {
    userId: Scalars['ID']
}

export type QueryUserByEmailArgs = {
    email: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    user: UserMutation
    game: GameMutation
    group: GroupMutation
    event: EventMutation
    admin: AdminMutation
}

export type HomepageQuery = {
    __typename?: 'HomepageQuery'
    lastAddedGames: Array<Game>
    mostPopularGames: Array<Game>
    lastComments: Array<Comment>
    nextEvents: Array<Event>
}

export type HomepageQueryLastCommentsArgs = {
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
}

export type GamesQuery = {
    __typename?: 'GamesQuery'
    bySearchTerm: Array<Game>
    recentAndMostPlayed: GamesPaged
    mostPlayed: GamesPaged
    recent: GamesPaged
    best: GamesPaged
    mostCommented: GamesPaged
}

export type GamesQueryBySearchTermArgs = {
    searchTerm: Scalars['String']
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
}

export type GamesQueryRecentAndMostPlayedArgs = {
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
    requiredLabels?: Maybe<Array<Scalars['ID']>>
    otherLabels?: Maybe<Array<Scalars['ID']>>
}

export type GamesQueryMostPlayedArgs = {
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
    requiredLabels?: Maybe<Array<Scalars['ID']>>
    otherLabels?: Maybe<Array<Scalars['ID']>>
}

export type GamesQueryRecentArgs = {
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
    requiredLabels?: Maybe<Array<Scalars['ID']>>
    otherLabels?: Maybe<Array<Scalars['ID']>>
}

export type GamesQueryBestArgs = {
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
    requiredLabels?: Maybe<Array<Scalars['ID']>>
    otherLabels?: Maybe<Array<Scalars['ID']>>
}

export type GamesQueryMostCommentedArgs = {
    offset?: Maybe<Scalars['Int']>
    limit?: Maybe<Scalars['Int']>
    requiredLabels?: Maybe<Array<Scalars['ID']>>
    otherLabels?: Maybe<Array<Scalars['ID']>>
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
    currentUsersComment?: Maybe<Comment>
    currentUsersRating?: Maybe<Rating>
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

export type GamesPaged = {
    __typename?: 'GamesPaged'
    games: Array<Game>
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
    role?: Maybe<UserRole>
    amountOfComments?: Maybe<Scalars['Int']>
    amountOfPlayed?: Maybe<Scalars['Int']>
    amountOfCreated?: Maybe<Scalars['Int']>
    image?: Maybe<Image>
    commentsPaged: CommentsPaged
    ratings: Array<Rating>
    playedGames: Array<GameWithRating>
    wantedGames: Array<Game>
    authoredGames: Array<Game>
    name: Scalars['String']
    description?: Maybe<Scalars['String']>
    email: Scalars['String']
    nickname?: Maybe<Scalars['String']>
    birthDate?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
}

export type UserCommentsPagedArgs = {
    offset: Scalars['Int']
    limit: Scalars['Int']
}

export type GameWithRating = {
    __typename?: 'GameWithRating'
    game: Game
    rating?: Maybe<Scalars['Int']>
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

export type UserMutation = {
    __typename?: 'UserMutation'
    logIn?: Maybe<User>
    logOut?: Maybe<User>
    createUser?: Maybe<User>
    updateLoggedInUser: User
    updateLoggedInUserPassword: User
    startRecoverPassword?: Maybe<Scalars['Boolean']>
    finishRecoverPassword?: Maybe<User>
}

export type UserMutationLogInArgs = {
    userName: Scalars['String']
    password: Scalars['String']
}

export type UserMutationCreateUserArgs = {
    input: CreateUserInput
}

export type UserMutationUpdateLoggedInUserArgs = {
    input: UpdateLoggedInUserInput
}

export type UserMutationUpdateLoggedInUserPasswordArgs = {
    oldPassword: Scalars['String']
    newPassword: Scalars['String']
}

export type UserMutationStartRecoverPasswordArgs = {
    email: Scalars['String']
    recoverUrl: Scalars['String']
}

export type UserMutationFinishRecoverPasswordArgs = {
    token: Scalars['String']
    newPassword: Scalars['String']
}

export type CreateUserInput = {
    email: Scalars['String']
    password: Scalars['String']
    profilePicture?: Maybe<UploadedFileInput>
    name: Scalars['String']
    nickname?: Maybe<Scalars['String']>
    birthDate?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
    recaptcha: Scalars['String']
}

export type UpdateLoggedInUserInput = {
    email: Scalars['String']
    profilePicture?: Maybe<UploadedFileInput>
    name: Scalars['String']
    nickname?: Maybe<Scalars['String']>
    birthDate?: Maybe<Scalars['String']>
    city?: Maybe<Scalars['String']>
}

export type GameMutation = {
    __typename?: 'GameMutation'
    createGame: Game
    updateGame: Game
    deleteGame: Game
    rateGame: Game
    deleteGameRating: Game
    setGamePlayedState: Game
    createOrUpdateComment: Game
    setCommentVisible: Game
    setCommentLiked: Game
}

export type GameMutationCreateGameArgs = {
    input?: Maybe<CreateGameInput>
}

export type GameMutationUpdateGameArgs = {
    input?: Maybe<UpdateGameInput>
}

export type GameMutationDeleteGameArgs = {
    gameId: Scalars['ID']
}

export type GameMutationRateGameArgs = {
    gameId: Scalars['ID']
    rating?: Maybe<Scalars['Int']>
}

export type GameMutationDeleteGameRatingArgs = {
    gameId: Scalars['ID']
    userId?: Maybe<Scalars['ID']>
}

export type GameMutationSetGamePlayedStateArgs = {
    gameId: Scalars['ID']
    state: Scalars['Int']
}

export type GameMutationCreateOrUpdateCommentArgs = {
    gameId: Scalars['ID']
    comment: Scalars['String']
}

export type GameMutationSetCommentVisibleArgs = {
    commentId: Scalars['ID']
    visible: Scalars['Boolean']
}

export type GameMutationSetCommentLikedArgs = {
    commentId: Scalars['ID']
    liked: Scalars['Boolean']
}

export type GroupMutation = {
    __typename?: 'GroupMutation'
    createGroup: Group
    updateGroup: Group
}

export type GroupMutationCreateGroupArgs = {
    input?: Maybe<CreateGroupInput>
}

export type GroupMutationUpdateGroupArgs = {
    input?: Maybe<UpdateGroupInput>
}

export type CreateGameInput = {
    name: Scalars['String']
    description: Scalars['String']
    authors: Array<Scalars['ID']>
    newAuthors: Array<NewAuthorInput>
    groupAuthors: Array<Scalars['ID']>
    newGroupAuthors: Array<NewGroupAuthorInput>
    labels: Array<Scalars['ID']>
    newLabels: Array<NewLabelInput>
    year?: Maybe<Scalars['Int']>
    players?: Maybe<Scalars['Int']>
    menRole?: Maybe<Scalars['Int']>
    womenRole?: Maybe<Scalars['Int']>
    bothRole?: Maybe<Scalars['Int']>
    hours?: Maybe<Scalars['Int']>
    days?: Maybe<Scalars['Int']>
    coverPhoto?: Maybe<UploadedFileInput>
    web?: Maybe<Scalars['String']>
    photoAuthor?: Maybe<Scalars['String']>
    galleryURL?: Maybe<Scalars['String']>
    video?: Maybe<Scalars['String']>
    ratingsDisabled?: Maybe<Scalars['Boolean']>
    commentsDisabled?: Maybe<Scalars['Boolean']>
}

export type UpdateGameInput = {
    id: Scalars['ID']
    name: Scalars['String']
    description: Scalars['String']
    authors: Array<Scalars['ID']>
    newAuthors: Array<NewAuthorInput>
    groupAuthors: Array<Scalars['ID']>
    newGroupAuthors: Array<NewGroupAuthorInput>
    labels: Array<Scalars['ID']>
    newLabels: Array<NewLabelInput>
    year?: Maybe<Scalars['Int']>
    players?: Maybe<Scalars['Int']>
    menRole?: Maybe<Scalars['Int']>
    womenRole?: Maybe<Scalars['Int']>
    bothRole?: Maybe<Scalars['Int']>
    hours?: Maybe<Scalars['Int']>
    days?: Maybe<Scalars['Int']>
    coverPhoto?: Maybe<UploadedFileInput>
    web?: Maybe<Scalars['String']>
    photoAuthor?: Maybe<Scalars['String']>
    galleryURL?: Maybe<Scalars['String']>
    video?: Maybe<Scalars['String']>
    ratingsDisabled?: Maybe<Scalars['Boolean']>
    commentsDisabled?: Maybe<Scalars['Boolean']>
}

export type UploadedFileInput = {
    fileName: Scalars['String']
    contents: Scalars['String']
}

export type NewAuthorInput = {
    email?: Maybe<Scalars['String']>
    name: Scalars['String']
    nickname?: Maybe<Scalars['String']>
}

export type NewGroupAuthorInput = {
    name: Scalars['String']
}

export type NewLabelInput = {
    name: Scalars['String']
    description?: Maybe<Scalars['String']>
}

export type EventMutation = {
    __typename?: 'EventMutation'
    createEvent: Event
    updateEvent: Event
    deleteEvent: Event
}

export type EventMutationCreateEventArgs = {
    input: CreateEventInput
}

export type EventMutationUpdateEventArgs = {
    input: UpdateEventInput
}

export type EventMutationDeleteEventArgs = {
    id: Scalars['ID']
}

export type CreateEventInput = {
    name: Scalars['String']
    fromDate: Scalars['String']
    toDate: Scalars['String']
    amountOfPlayers: Scalars['Int']
    web?: Maybe<Scalars['String']>
    loc: Scalars['String']
    description?: Maybe<Scalars['String']>
    games: Array<Scalars['ID']>
    labels: Array<Scalars['ID']>
    newLabels: Array<NewLabelInput>
    latitude?: Maybe<Scalars['Float']>
    longitude?: Maybe<Scalars['Float']>
}

export type UpdateEventInput = {
    id: Scalars['ID']
    name: Scalars['String']
    fromDate: Scalars['String']
    toDate: Scalars['String']
    amountOfPlayers: Scalars['Int']
    web?: Maybe<Scalars['String']>
    loc: Scalars['String']
    description?: Maybe<Scalars['String']>
    games: Array<Scalars['ID']>
    labels: Array<Scalars['ID']>
    newLabels: Array<NewLabelInput>
    latitude?: Maybe<Scalars['Float']>
    longitude?: Maybe<Scalars['Float']>
}

export type AdminQuery = {
    __typename?: 'AdminQuery'
    allLabels: Array<Label>
    allUsers: Array<User>
    ratingStats: Array<RatingStats>
    commentStats: Array<CommentStats>
    selfRated: Array<SelfRated>
}

export type RatingStats = {
    __typename?: 'RatingStats'
    year: Scalars['Int']
    month: Scalars['Int']
    numRatings: Scalars['Int']
    averageRating: Scalars['Float']
}

export type CommentStats = {
    __typename?: 'CommentStats'
    year: Scalars['Int']
    month: Scalars['Int']
    amount: Scalars['Int']
}

export type SelfRated = {
    __typename?: 'SelfRated'
    user: User
    game: Game
}

export type AdminMutation = {
    __typename?: 'AdminMutation'
    updateLabel: Label
    setLabelRequired: Label
    setLabelAuthorized: Label
    deleteLabel?: Maybe<Label>
    setUserRole: User
    deleteUser?: Maybe<User>
}

export type AdminMutationUpdateLabelArgs = {
    input: UpdateLabelInput
}

export type AdminMutationSetLabelRequiredArgs = {
    labelId: Scalars['ID']
    required: Scalars['Boolean']
}

export type AdminMutationSetLabelAuthorizedArgs = {
    labelId: Scalars['ID']
    authorized: Scalars['Boolean']
}

export type AdminMutationDeleteLabelArgs = {
    labelId: Scalars['ID']
}

export type AdminMutationSetUserRoleArgs = {
    userId: Scalars['ID']
    role: UserRoleIn
}

export type AdminMutationDeleteUserArgs = {
    userId: Scalars['ID']
}

export enum UserRole {
    User = 'USER',
    Editor = 'EDITOR',
    Admin = 'ADMIN',
    Author = 'AUTHOR',
    Anonymous = 'ANONYMOUS',
}

export enum UserRoleIn {
    User = 'USER',
    Editor = 'EDITOR',
    Admin = 'ADMIN',
}

export type UpdateLabelInput = {
    id: Scalars['ID']
    name: Scalars['String']
    description?: Maybe<Scalars['String']>
}

export type Donation = {
    __typename?: 'Donation'
    amount: Scalars['Float']
    donor?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type Config = {
    __typename?: 'Config'
    reCaptchaKey: Scalars['String']
}

export type CreateGroupInput = {
    name: Scalars['String']
}

export type UpdateGroupInput = {
    id: Scalars['ID']
    name: Scalars['String']
}
