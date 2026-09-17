import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0404" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.logoText}>word of movie</Text>
          <Text style={styles.titleHighlight}>DÊ SUA NOTA .</Text>
          <Text style={styles.titleMain}>COMPARTILHE{"\n"}SUA OPINIÃO.</Text>
          <Text style={styles.subtitle}>
            Avalie filmes, descubra novas histórias{"\n"}e veja o que a comunidade está achando.
          </Text>
        </View>

        {/* BARRA DE PESQUISA */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#FFD700" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="buscar filmes...."
            placeholderTextColor="#e0e0e0"
          />
        </View>

        {/* CARROSSEL DE FILMES */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieCarousel}>
          <Image source={{ uri: 'https://image.tmdb.org/t/p/w200/n0ybibhJtQ5icDqTp8eRytcZIix.jpg' }} style={styles.moviePosterLarge} />
          <Image source={{ uri: 'https://image.tmdb.org/t/p/w200/t6HIqrHezINNd8yWEcAhCPDQeOp.jpg' }} style={styles.moviePosterLarge} />
          <Image source={{ uri: 'https://image.tmdb.org/t/p/w200/3kRPOQk7Xo6eM6cDFR2wO5K8A5q.jpg' }} style={styles.moviePosterLarge} />
        </ScrollView>

        {/* CATEGORIAS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>ver todos{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesContainer}>
          <View style={styles.categoryItem}>
            <View style={styles.categoryBox}>
              <Ionicons name="heart-outline" size={32} color="#FFF" />
            </View>
            <Text style={styles.categoryLabel}>romance</Text>
          </View>
          <View style={styles.categoryItem}>
            <View style={styles.categoryBox}>
              <Ionicons name="basketball-outline" size={32} color="#FFF" />
            </View>
            <Text style={styles.categoryLabel}>esporte</Text>
          </View>
          <View style={styles.categoryItem}>
            <View style={styles.categoryBox}>
              <Ionicons name="flash-outline" size={32} color="#FFF" />
            </View>
            <Text style={styles.categoryLabel}>ação</Text>
          </View>
          <View style={styles.categoryItem}>
            <View style={styles.categoryBox}>
              <Ionicons name="film-outline" size={32} color="#FFF" />
            </View>
            <Text style={styles.categoryLabel}>classicos</Text>
          </View>
        </View>

        {/* AVALIAÇÕES RECENTES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitleUppercase}>AVALIAÇÕES RECENTES</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>VER TODAS{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Avaliação 1 */}
        <View style={styles.reviewCard}>
          <Image source={{ uri: 'https://image.tmdb.org/t/p/w200/8qBylBsQf4llkGrjuCBa1G1K9aE.jpg' }} style={styles.reviewPoster} />
          <View style={styles.reviewContent}>
            <Text style={styles.reviewMovieTitle}>Homem-Aranha:{"\n"}sem volta pra casa</Text>
            <Text style={styles.reviewText} numberOfLines={3}>
              Um filme de ficção cientifica para todos os publicos.
            </Text>
          </View>
          <View style={styles.reviewerInfo}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.reviewerAvatar} />
            <Text style={styles.reviewerName}>Amanda</Text>
            <Text style={styles.reviewerRating}>5 estrelas</Text>
          </View>
        </View>

        {/* Avaliação 2 */}
        <View style={styles.reviewCard}>
          <Image source={{ uri: 'https://image.tmdb.org/t/p/w200/kU34v7jY5jM994kIinO3TtbkP8X.jpg' }} style={styles.reviewPoster} />
          <View style={styles.reviewContent}>
            <Text style={styles.reviewMovieTitle}>Batman</Text>
            <Text style={styles.reviewText} numberOfLines={3}>
              Filme incrível! Atmosfera sombria e história envolvente.
            </Text>
          </View>
          <View style={styles.reviewerInfo}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.reviewerAvatar} />
            <Text style={styles.reviewerName}>carlos</Text>
            <Text style={styles.reviewerRating}>2 estrelas</Text>
          </View>
        </View>

        {/* Espaçamento extra no final da rolagem */}
        <View style={{ height: 20 }} />

      </ScrollView>

      {/* NAVEGAÇÃO INFERIOR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="movie-open-outline" size={28} color="#aaa" />
          <Text style={styles.navText}>Filmes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navItemActive}>
            <Ionicons name="star" size={24} color="#000" />
          </View>
          <Text style={styles.navText}>Avaliar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-circle-outline" size={30} color="#aaa" />
          <Text style={styles.navText}>Conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#380a0a', // Fundo vermelho escuro simulando o gradiente
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 80, // Espaço para a barra inferior
  },
  header: {
    marginBottom: 20,
  },
  logoText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
  },
  titleHighlight: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleMain: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    marginBottom: 10,
  },
  subtitle: {
    color: '#d3d3d3',
    fontSize: 12,
    lineHeight: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5c1313',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  movieCarousel: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  moviePosterLarge: {
    width: 110,
    height: 160,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#222',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitleUppercase: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  seeAllText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryBox: {
    backgroundColor: '#000',
    width: 65,
    height: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  reviewPoster: {
    width: 70,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#222',
  },
  reviewContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  reviewMovieTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    color: '#ccc',
    fontSize: 12,
    lineHeight: 16,
  },
  reviewerInfo: {
    alignItems: 'center',
    width: 70,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  reviewerName: {
    color: '#aaa',
    fontSize: 12,
  },
  reviewerRating: {
    color: '#aaa',
    fontSize: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#1a0404',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: '#FFD700',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  navText: {
    color: '#FFF',
    fontSize: 10,
    marginTop: 2,
  }
});