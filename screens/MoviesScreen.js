import { ActivityIndicator, View, Text, ScrollView, Image, StyleSheet, RefreshControl } from "react-native";
import { Link, useTheme } from '@react-navigation/native'
import { useEffect, useState } from "react";
import MovieScreen from "./MovieScreen";

function MoviesScreen(navigation) {
    const [movies, setMovies] = useState()
    const [refresh, setRefresh] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme()

    useEffect(() => {
        setLoading(true)

        const page = randomNumber();

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=235b77fe4aedf709eb99a3ac9f078f57&language=tr-TR&page=${page}&region=tr`)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results)
                setLoading(false)
            })
    }, []);

    setInterval(() => {
        if (!refresh) {
            setRefresh(true)
        }
    }, 5000)

    const randomNumber = () => {
        const random = Math.floor(Math.random() * 500);
        return random;
    }

    const onRefresh = () => {
        const page = randomNumber();
        if (refresh) {
            setRefreshing(true)
            setRefresh(false)

            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=235b77fe4aedf709eb99a3ac9f078f57&language=tr-TR&page=${page}&region=tr`)
                .then(res => res.json())
                .then(data => {
                    setMovies(data.results)
                    setRefreshing(false)
                })
        }
    }

    const refreshControl = refresh ? <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        progressBackgroundColor={"#000"}
        colors={["red", "green", "blue"]}
    /> : false;

    return (
        <View style={{ paddingBottom: 85 }}>
            <View style={styles.header}>
                <Text style={[styles.moviesHead, { color: colors.text }]}>
                    Burada senin için farklı farklı filmler öneriyoruz :)
                    <View>
                        <Text style={{ fontSize: 14, marginTop: 15, color: colors.text }}>(Unutma her sayfayı yenilediğinde farklı filmler çıkacaktır!)</Text>
                    </View>
                </Text>
            </View>

            <ScrollView refreshControl={refreshControl} contentContainerStyle={styles.movies}>
                {movies && movies.map(movie => (
                    <View style={[styles.movie, { backgroundColor: "rgba(255, 255, 255, 0.2)" }]} key={movie.id}>
                        <Link to={{ screen: "movie-page", params: { id: movie.id } }} style={styles.movieContainer}>
                            <View>
                                <View>
                                    <Text style={[styles.movieTitle, { color: colors.text }]}> {movie.title}</Text>
                                    <Image source={{
                                        uri: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : "https://www.yegenmetal.com/Content/img/resimYok.jpg",
                                        width: 100,
                                        height: 100
                                    }}
                                    />
                                </View>
                            </View>
                        </Link>
                    </View>
                ))
                }

                {!movies && loading && <ActivityIndicator size="large" style={styles.loader} />}
            </ScrollView >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        margin: 20,
    },
    movies: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
    },
    movie: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: "95%",
        height: 150,
        marginBottom: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        paddingLeft: 10,
        paddingRight: 10
    },
    movieContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '25%'
    },
    movieTitle: {
        margin: 10,
        left: -80,
    },
    moviesHead: {
        fontSize: 20,
    }
});

export default MoviesScreen;
