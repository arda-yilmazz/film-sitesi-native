import { useTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function MovieScreen({ route }) {

    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();
    const { id } = route.params;

    useEffect(() => {
        setLoading(true)
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=235b77fe4aedf709eb99a3ac9f078f57&language=tr-TR`
        )
            .then(res => res.json())
            .then(data => {
                setMovie(data)
                setLoading(false)
            });
    }, []);

    return (
        <View style={{ paddingTop: 20 }}>
            <Text style={[styles.movieTitle, { color: colors.text }]}>
                {movie && movie.title}
            </Text>
            <View>
                {!movie && loading ? (
                    <Image source={{
                        uri: "../assets/download.png",
                        width: "100%",
                        height: 200
                    }} />
                ) : <Image source={{
                    uri: movie && movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "https://www.yegenmetal.com/Content/img/resimYok.jpg",
                    width: "100%",
                    height: 200
                }} />}
            </View>
            <Text style={[styles.movieOverview, { color: colors.text }]}>
                {movie && movie.overview}
                {movie && !movie.overview && (<Text style={{ color: "red" }}>Burada maalesef hiç bir şey yok :/</Text>)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    movieTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        fontSize: 22,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.2)",
    },
    movieOverview: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        fontSize: 18,
        marginLeft: "auto",
        borderTopWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.2)",
        paddingTop: 20,
        paddingBottom: 20,
        padding: 20
    },
})

export default MovieScreen;