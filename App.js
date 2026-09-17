import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  Pressable,
  Animated,
  SafeAreaView,
  StatusBar,
  Alert,
  useWindowDimensions,
  Switch,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// ====================================================
// DADOS E CONFIGURAÇÕES DA TELA DE FILMES (CATÁLOGO)
// ====================================================
const SIMILAR_MOVIES = [
  {
    id: '1',
    title: 'Sword Art Online',
    image: 'https://m.media-amazon.com/images/M/MV5BY2I2MzI1ODYtMWRlOS00M2E0LWE1MWRtODEwNWFiM2I5NDM3XkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: '2',
    title: 'Saga Of Tanya The Evil',
    image: 'https://m.media-amazon.com/images/M/MV5BZWFlYmE2MWEtNjA2Ni00MGI1LWI3NTEtY2ViYjA1NWJhN2ZkXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: '3',
    title: 'Pandora Hearts',
    image: 'https://m.media-amazon.com/images/M/MV5BNGEyM2E4MTctMzA2OS00YTVmLWI2NTktODU1MGEwMGU2Yjg4XkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: '4',
    title: 'No Game No Life',
    image: 'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MDM3LTk3ZDUtMTI1N2FiYmFlM2JhXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: '5',
    title: 'Code Geass',
    image: 'https://m.media-amazon.com/images/M/MV5BYzA2N2ZhOGEtZWZlMi00Y2JjLWEzNjItZTNlY2UxZTVmNmEwXkEyXkFqcGc@._V1_.jpg',
  },
  {
    id: '6',
    title: 'Lord Of Mysteries',
    image: 'https://m.media-amazon.com/images/M/MV5BMDU2YTA3MTctMWY4Ni00NjQ4LWE1NTItY2E4YTAxNzE1YWE1XkEyXkFqcGc@._V1_.jpg',
  },
];

const HoverableMovieCard = ({ image, title, isMain = false }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleHoverIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const handleHoverOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  return (
    <Pressable
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      style={isMain ? movieStyles.mainImageContainer : movieStyles.cardContainer}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%', height: '100%' }}>
        <Image
          source={{ uri: image }}
          style={isMain ? movieStyles.mainPosterImage : movieStyles.cardImage}
          resizeMode="cover"
        />
      </Animated.View>
    </Pressable>
  );
};

// ====================================================
// CORES DA TELA DE APRESENTAÇÃO (BEM-VINDO)
// ====================================================
const aboutColors = {
  bgDark: '#4a0e14',
  cardRed: '#6b1420',
  gold: '#f5c94a',
  goldSoft: '#e8c56b',
  cream: '#f5e9d8',
  creamDim: '#d9c9b8',
  white: '#ffffff',
  line: 'rgba(245, 233, 216, 0.25)',
  pageBg: '#e9e4dc',
};

const EVAL_COLORS = {
  RED: '#DB0800',
  DARK: '#12100F',
  YELLOW: '#E3CE52',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

const MOVIE_DEMO = {
  title: 'Homem-Aranha 3',
  year: '2007',
  duration: '2h 19min',
  genres: 'Ação • Aventura • Ficção científica',
  director: 'Sam Raimi',
  poster: 'https://image.tmdb.org/t/p/w500/saO9wZLuPPN2RivUkajEzQtSitf.jpg',
};

export default function App() {
  const { width } = useWindowDimensions();
  const isCompactGrid = width < 480;
  const isWeb = Platform.OS === 'web';
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const isSmallPhone = width < 360;
  const isTablet = width >= 600;

  // ====================================================
  // ESTADOS GLOBAIS DA APLICAÇÃO
  // ====================================================
  const [tela, setTela] = useState('login');
  const [mensagemGlobal, setMensagemGlobal] = useState('');

  // Estados de Login
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState('');
  
  // Estados de Conta
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [emailConta, setEmailConta] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senhaConta, setSenhaConta] = useState('');
  const [aceitou, setAceitou] = useState(false);

  // Estados de Cadastro de Filme antigo (se necessário)
  const [tituloFilme, setTituloFilme] = useState('');
  const [ano, setAno] = useState('');
  const [duracao, setDuracao] = useState('');
  const [genero, setGenero] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [sinopse, setSinopse] = useState('');

  // Estados da Tela de Home/Catálogo
  const [searchText, setSearchText] = useState('No Game No Life: Zero');
  const [isFavorited, setIsFavorited] = useState(false);

  // Estados da Nova Tela de Avaliação Detalhada
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [savedOpinion, setSavedOpinion] = useState('');
  const [editingOpinion, setEditingOpinion] = useState(false);
  const [favoriteEval, setFavoriteEval] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [watchedDate, setWatchedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const opinionInputRef = useRef(null);

  // ====================================================
  // FUNÇÕES DE AVALIAÇÃO DETALHADA
  // ====================================================
  const addTag = () => {
    const newTag = tagInput.trim();
    if (!newTag) return;
    const validTag = /^[A-Za-zÀ-ÿ0-9 ]+$/.test(newTag);
    if (!validTag) {
      Alert.alert('Tag inválida', 'Use somente letras, números e espaços.');
      return;
    }
    if (newTag.length > 20) {
      Alert.alert('Tag muito grande', 'A tag pode ter no máximo 20 caracteres.');
      return;
    }
    const alreadyExists = tags.some(tag => tag.toLowerCase() === newTag.toLowerCase());
    if (alreadyExists) {
      Alert.alert('Tag já adicionada', 'Você já adicionou essa tag.');
      return;
    }
    setTags([...tags, newTag]);
    setTagInput('');
    setShowTagInput(false);
  };

  const removeTag = tagToRemove => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const sendOpinion = () => {
    const text = opinion.trim();
    if (!text) {
      Alert.alert('Opinião vazia', 'Escreva alguma coisa antes de enviar.');
      return;
    }
    setSavedOpinion(text);
    setOpinion(text);
    setEditingOpinion(false);
  };

  const editOpinion = () => {
    setOpinion(savedOpinion);
    setEditingOpinion(true);
    setTimeout(() => {
      opinionInputRef.current?.focus();
    }, 100);
  };

  const deleteOpinion = () => {
    Alert.alert('Excluir opinião', 'Deseja realmente excluir o que escreveu?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setOpinion('');
          setSavedOpinion('');
          setEditingOpinion(false);
          opinionInputRef.current?.blur();
        },
      },
    ]);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setWatchedDate(selectedDate);
  };

  const formatDate = date => {
    if (!date) return 'Selecionar data';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateForWeb = date => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleWebDateChange = event => {
    const value = event.target.value;
    if (!value) {
      setWatchedDate(null);
      return;
    }
    const parts = value.split('-');
    if (parts.length === 3) {
      const year = Number(parts[0]);
      const month = Number(parts[1]);
      const day = Number(parts[2]);
      setWatchedDate(new Date(year, month - 1, day));
    }
  };

  const saveReview = () => {
    const review = {
      movie: MOVIE_DEMO.title,
      rating,
      opinion: savedOpinion,
      favorite: favoriteEval,
      tags,
      watchedDate: watchedDate ? formatDate(watchedDate) : null,
    };
    console.log('AVALIAÇÃO SALVA:', review);
    Alert.alert('Avaliação salva!', 'Sua avaliação foi salva com sucesso.', [
      { text: 'OK', onPress: () => setTela('home') }
    ]);
  };

  // ====================================================
  // FUNÇÕES DE NAVEGAÇÃO E LOGIN
  // ====================================================
  function validarLogin() {
    setMensagemGlobal('');
    if (login === 'admin' && senha === '123456') {
      setTela('bem_vindo');
    } else {
      setMensagemGlobal('Login ou Senha incorretos.');
    }
  }

  function fazerLogout() {
    setTela('login');
    setLogin('');
    setSenha('');
    setMensagemGlobal('');
    setLembrar(false);
  }

  function enviarRecuperacao() {
    if (emailRecuperacao === '') {
      Alert.alert('Atenção', 'Por favor, digite um email válido.');
      return;
    }
    Alert.alert(
      'Email Enviado!', 
      'Instruções enviadas para: ' + emailRecuperacao,
      [{ text: 'OK', onPress: () => setTela('login') }]
    );
    setEmailRecuperacao('');
  }

  function criarConta() {
    if (nomeCompleto === '' || emailConta === '' || telefone === '' || dataNascimento === '' || senhaConta === '') {
      setMensagemGlobal('Preencha todos os campos.');
      return;
    }
    if (!aceitou) {
      setMensagemGlobal('Marque a caixinha para continuar.');
      return;
    }
    setMensagemGlobal('');
    Alert.alert('Sucesso!', 'Conta criada com sucesso! Seja bem-vindo(a).', [
      { text: 'OK', onPress: () => setTela('bem_vindo') }
    ]);
  }

  function cadastrarFilme() {
    if (tituloFilme === '' || ano === '' || duracao === '' || genero === '' || classificacao === '' || sinopse === '') {
      setMensagemGlobal('Preencha todos os campos do filme.');
      return;
    }
    setMensagemGlobal('');
    Alert.alert('Sucesso!', 'Filme cadastrado com sucesso!', [
      { text: 'Ir para Home', onPress: () => setTela('home') }
    ]);
  }

  // ====================================================
  // RENDERIZAÇÃO: TELA DE RECUPERAR SENHA
  // ====================================================
  if (tela === 'recuperar') {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#B80000" />
        <View style={styles.logoContainer}>
          <Text style={styles.titleWorld}>Recuperar</Text>
          <Text style={styles.titleSub}>Senha</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.labelLogin}>Email cadastrado:</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="Digite seu email"
            placeholderTextColor="#4A3B00"
            value={emailRecuperacao}
            onChangeText={setEmailRecuperacao}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TouchableOpacity style={[styles.buttonEntrar, { alignItems: 'center', marginTop: 10 }]} onPress={enviarRecuperacao}>
            <Text style={styles.buttonText}>Enviar link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToLoginButton} onPress={() => setTela('login')}>
            <Text style={styles.forgotText}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ====================================================
  // RENDERIZAÇÃO: TELA DE CRIAR CONTA
  // ====================================================
  if (tela === 'cadastro_conta') {
    return (
      <SafeAreaView style={styles.formScreenContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#A60303" />
        <ScrollView contentContainerStyle={styles.scrollForm} showsVerticalScrollIndicator={false}>
          <Text style={styles.formTitulo}>Criar Conta</Text>
          <Text style={styles.formSubtitulo}>Preencha seus dados para começar</Text>
          
          <Text style={styles.formLabel}>Nome completo:</Text>
          <TextInput style={styles.formInput} placeholder="Digite seu nome completo" placeholderTextColor="#12100F" value={nomeCompleto} onChangeText={setNomeCompleto} />
          
          <Text style={styles.formLabel}>E-mail:</Text>
          <TextInput style={styles.formInput} placeholder="Digite seu e-mail" placeholderTextColor="#12100F" value={emailConta} onChangeText={setEmailConta} keyboardType="email-address" autoCapitalize="none" />
          
          <Text style={styles.formLabel}>Telefone:</Text>
          <TextInput style={styles.formInput} placeholder="(00) 00000-0000" placeholderTextColor="#12100F" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
          
          <Text style={styles.formLabel}>Data de nascimento:</Text>
          <TextInput style={styles.formInput} placeholder="DD/MM/AAAA" placeholderTextColor="#12100F" value={dataNascimento} onChangeText={setDataNascimento} keyboardType="numeric" />
          
          <Text style={styles.formLabel}>Senha:</Text>
          <TextInput style={styles.formInput} placeholder="Crie uma senha" placeholderTextColor="#12100F" value={senhaConta} onChangeText={setSenhaConta} secureTextEntry={true} />

          <TouchableOpacity style={styles.formCheckboxContainer} onPress={() => setAceitou(!aceitou)}>
            <View style={styles.formCheckbox}>{aceitou && <Text style={styles.formCheck}>✓</Text>}</View>
            <Text style={styles.formTextoCheckbox}>Aceito os termos e condições</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.formBotao} onPress={criarConta}>
            <Text style={styles.formTextoBotao}>Criar Conta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.formBotao, {backgroundColor: 'transparent', borderWidth: 2, borderColor: '#D4AF37'}]} onPress={() => { setTela('login'); setMensagemGlobal(''); }}>
            <Text style={[styles.formTextoBotao, {color: '#D4AF37'}]}>Voltar para o Login</Text>
          </TouchableOpacity>
          
          <Text style={styles.formMensagem}>{mensagemGlobal}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ====================================================
  // RENDERIZAÇÃO: TELA DE APRESENTAÇÃO (BEM-VINDO)
  // ====================================================
  if (tela === 'bem_vindo') {
    return (
      <SafeAreaView style={styles.aboutContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={aboutColors.pageBg} />
        <ScrollView contentContainerStyle={styles.aboutScrollContainer}>
          <View style={styles.aboutScreen}>
            <View style={styles.aboutDecorativeDot} />

            <View style={styles.aboutHeader}>
              <View style={styles.aboutClapperBadge}>
                <Text style={styles.aboutEmojiIcon}>🎬</Text>
              </View>
              <View style={styles.aboutTitleBlock}>
                <Text style={styles.aboutTitle}>
                  WORLD{'\n'}OF <Text style={styles.aboutAccent}>MOVIE</Text>
                </Text>
                <View style={styles.aboutSubtitleContainer}>
                  <Text style={styles.aboutSubtitle}>
                    Sua experiência com filmes em um só lugar.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.aboutContent}>
              <View style={styles.aboutObjetivoCard}>
                <View style={styles.aboutSectionLabel}>
                  <Text style={styles.aboutIcon}>🎯</Text>
                  <Text style={styles.aboutSectionTitle}>Objetivo</Text>
                </View>
                <Text style={styles.aboutObjetivoText}>
                  Permitir que os usuários avaliem, comentem e descubram filmes
                  de forma simples e organizada.
                </Text>
              </View>

              <View style={styles.aboutFuncionalidades}>
                <View style={styles.aboutSectionLabel}>
                  <Text style={styles.aboutIcon}>⭐</Text>
                  <Text style={styles.aboutSectionTitle}>Funcionalidades</Text>
                </View>

                <View style={styles.aboutGrid}>
                  <View style={[styles.aboutFeatureCard, { width: isCompactGrid ? '100%' : '48.5%' }]}>
                    <Text style={styles.aboutFeatureIcon}>⭐</Text>
                    <Text style={styles.aboutFeatureTitle}>
                      Avaliar <Text style={styles.aboutHighlight}>filmes</Text>
                    </Text>
                    <Text style={styles.aboutFeatureText}>De notas de 0 a 5 estrelas.</Text>
                  </View>

                  <View style={[styles.aboutFeatureCard, { width: isCompactGrid ? '100%' : '48.5%' }]}>
                    <Text style={styles.aboutFeatureIcon}>💬</Text>
                    <Text style={styles.aboutFeatureTitle}>Comentários</Text>
                    <Text style={styles.aboutFeatureText}>
                      Escreva e leia avaliações de outros usuários.
                    </Text>
                  </View>

                  <View style={[styles.aboutFeatureCard, { width: isCompactGrid ? '100%' : '48.5%' }]}>
                    <Text style={styles.aboutFeatureIcon}>❤️</Text>
                    <Text style={styles.aboutFeatureTitle}>Favoritos</Text>
                    <Text style={styles.aboutFeatureText}>Salve seus filmes favoritos.</Text>
                  </View>

                  <View style={[styles.aboutFeatureCard, { width: isCompactGrid ? '100%' : '48.5%' }]}>
                    <Text style={styles.aboutFeatureIcon}>📋</Text>
                    <Text style={styles.aboutFeatureTitle}>Lista para assistir</Text>
                    <Text style={styles.aboutFeatureText}>
                      Crie sua lista de filmes para não esquecer.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.aboutSobreCard}>
                <Text style={styles.aboutSobreIcon}>🎬</Text>
                <View style={styles.aboutSobreContent}>
                  <Text style={styles.aboutSobreTitle}>
                    Sobre <Text style={styles.aboutHighlight}>o World of movie</Text>
                  </Text>
                  <Text style={styles.aboutSobreText}>
                    Uma plataforma feita para quem ama cinema. Descubra, avalie e
                    compartilhe grandes histórias!
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.aboutBtnContinuar} onPress={() => setTela('home')}>
                <Text style={styles.aboutBtnContinuarText}>Acessar Catálogo de Filmes ➔</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ====================================================
  // RENDERIZAÇÃO: TELA DE AVALIAÇÃO DETALHADA (AVALIAR FILME)
  // ====================================================
  if (tela === 'avaliar_filme') {
    const hp = isSmallPhone ? 10 : isTablet ? 24 : 13;
    const pWidth = isSmallPhone ? 66 : isTablet ? 90 : 74;
    const pHeight = isSmallPhone ? 92 : isTablet ? 126 : 102;
    const tSize = isSmallPhone ? 16 : isTablet ? 22 : 18;
    const nSize = isSmallPhone ? 10 : isTablet ? 14 : 11;
    const cTitleSize = isSmallPhone ? 10 : isTablet ? 14 : 11;
    const cPadding = isTablet ? 16 : 10;
    const sSize = isSmallPhone ? 28 : isTablet ? 40 : 31;

    return (
      <SafeAreaView style={[evalStyles.safeArea, isWeb && evalStyles.webSafeArea]}>
        <KeyboardAvoidingView style={evalStyles.keyboard} behavior={isIOS ? 'padding' : undefined}>
          <View style={[evalStyles.phone, isWeb && evalStyles.webPhone, isTablet && evalStyles.tabletPhone]}>
            
            {/* TOPO */}
            <View style={evalStyles.topbar}>
              <TouchableOpacity
                style={evalStyles.backButton}
                onPress={() => setTela('home')}
                activeOpacity={0.7}
              >
                <Text style={evalStyles.backIcon}>‹</Text>
              </TouchableOpacity>
              <Text style={evalStyles.topbarTitle}>Avaliar filme</Text>
              <View style={evalStyles.topbarSpacer} />
            </View>

            <ScrollView
              style={evalStyles.scroll}
              contentContainerStyle={[
                evalStyles.content,
                { paddingHorizontal: hp, paddingBottom: isAndroid ? 22 : isIOS ? 12 : 8 },
              ]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* FILME HEADER */}
              <View style={evalStyles.movieHeader}>
                <Image source={{ uri: MOVIE_DEMO.poster }} style={[evalStyles.poster, { width: pWidth, height: pHeight }]} />
                <View style={evalStyles.movieInfo}>
                  <Text style={[evalStyles.movieTitle, { fontSize: tSize }]}>{MOVIE_DEMO.title}</Text>
                  <Text style={[evalStyles.movieMeta, { fontSize: nSize }]}>{MOVIE_DEMO.year} • {MOVIE_DEMO.duration}</Text>
                  <Text style={[evalStyles.movieGenre, { fontSize: nSize }]}>{MOVIE_DEMO.genres}</Text>
                  <Text style={[evalStyles.movieDirector, { fontSize: nSize }]}>Direção: {MOVIE_DEMO.director}</Text>
                </View>
              </View>

              {/* AVALIAÇÃO DE ESTRELAS */}
              <View style={[evalStyles.card, { padding: cPadding }]}>
                <Text style={[evalStyles.cardTitle, { fontSize: cTitleSize }]}>SUA AVALIAÇÃO</Text>
                <View style={evalStyles.ratingRow}>
                  <View style={evalStyles.starsContainer}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => setRating(star)}
                        activeOpacity={0.7}
                        style={evalStyles.starButton}
                      >
                        <Text
                          style={[
                            evalStyles.star,
                            { fontSize: sSize, lineHeight: sSize + 5 },
                            rating >= star ? evalStyles.starYellow : evalStyles.starWhite,
                          ]}
                        >
                          ★
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={evalStyles.ratingNumber}>
                    <Text style={evalStyles.ratingValue}>{rating}</Text>
                    <Text style={evalStyles.ratingTotal}>/ 5</Text>
                  </View>
                </View>
                <Text style={evalStyles.ratingDescription}>
                  {rating === 0 ? 'Toque nas estrelas para avaliar' : `Você avaliou com ${rating} de 5`}
                </Text>
              </View>

              {/* OPINIÃO */}
              <View style={[evalStyles.card, { padding: cPadding }]}>
                <Text style={[evalStyles.cardTitle, { fontSize: cTitleSize }]}>SUA OPINIÃO</Text>
                {savedOpinion && !editingOpinion ? (
                  <View>
                    <Text style={evalStyles.savedOpinion}>{savedOpinion}</Text>
                    <View style={evalStyles.opinionButtons}>
                      <TouchableOpacity style={evalStyles.editButton} onPress={editOpinion}>
                        <Text style={evalStyles.editText}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={evalStyles.deleteButton} onPress={deleteOpinion}>
                        <Text style={evalStyles.deleteText}>Excluir</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={evalStyles.textareaContainer}>
                      <TextInput
                        ref={opinionInputRef}
                        value={opinion}
                        onChangeText={setOpinion}
                        placeholder="Escreva sua opinião..."
                        placeholderTextColor={EVAL_COLORS.WHITE}
                        multiline
                        maxLength={500}
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        textAlignVertical="top"
                        style={evalStyles.textarea}
                      />
                      <Text style={evalStyles.characterCount}>{opinion.length}/500</Text>
                    </View>
                    <TouchableOpacity style={evalStyles.sendButton} onPress={sendOpinion} activeOpacity={0.8}>
                      <Text style={evalStyles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* FAVORITOS */}
              <View style={[evalStyles.card, { padding: cPadding }]}>
                <View style={evalStyles.favoriteRow}>
                  <Text style={[evalStyles.favoriteTextTitle, { fontSize: cTitleSize }]}>ADICIONAR AOS FAVORITOS</Text>
                  <Switch
                    value={favoriteEval}
                    onValueChange={setFavoriteEval}
                    trackColor={{ false: EVAL_COLORS.DARK, true: EVAL_COLORS.YELLOW }}
                    thumbColor={EVAL_COLORS.WHITE}
                    ios_backgroundColor={EVAL_COLORS.DARK}
                  />
                </View>
              </View>

              {/* TAGS */}
              <View style={[evalStyles.card, { padding: cPadding }]}>
                <Text style={[evalStyles.cardTitle, { fontSize: cTitleSize }]}>TAGS</Text>
                <View style={evalStyles.tagsContainer}>
                  {tags.map(tag => (
                    <TouchableOpacity key={tag} style={evalStyles.tag} onPress={() => removeTag(tag)}>
                      <Text style={evalStyles.tagText}>{tag}</Text>
                      <Text style={evalStyles.tagRemove}>×</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity style={evalStyles.addTagButton} onPress={() => setShowTagInput(!showTagInput)} activeOpacity={0.8}>
                    <Text style={evalStyles.addTagPlus}>+</Text>
                  </TouchableOpacity>
                </View>
                {showTagInput && (
                  <View style={evalStyles.tagInputRow}>
                    <TextInput
                      value={tagInput}
                      onChangeText={setTagInput}
                      placeholder="Digite uma tag..."
                      placeholderTextColor={EVAL_COLORS.WHITE}
                      maxLength={20}
                      autoFocus
                      style={evalStyles.tagInput}
                      onSubmitEditing={addTag}
                    />
                    <TouchableOpacity style={evalStyles.tagConfirmButton} onPress={addTag}>
                      <Text style={evalStyles.tagConfirmText}>✓</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* DATA */}
              <View style={[evalStyles.card, { padding: cPadding }]}>
                <Text style={[evalStyles.cardTitle, { fontSize: cTitleSize }]}>DATA EM QUE ASSISTIU</Text>
                {isWeb ? (
                  <View style={evalStyles.webDateContainer}>
                    <Text style={evalStyles.calendarIcon}>📅</Text>
                    <input
                      type="date"
                      value={formatDateForWeb(watchedDate)}
                      onChange={handleWebDateChange}
                      style={{
                        flex: 1,
                        height: 38,
                        backgroundColor: EVAL_COLORS.DARK,
                        border: `1px solid ${EVAL_COLORS.YELLOW}`,
                        borderRadius: 7,
                        color: EVAL_COLORS.WHITE,
                        fontSize: 11,
                        paddingLeft: 8,
                        paddingRight: 8,
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                      }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity style={evalStyles.datePlaceholder} onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
                    <Text style={evalStyles.calendarIcon}>📅</Text>
                    <Text style={evalStyles.datePlaceholderText}>{formatDate(watchedDate)}</Text>
                    <Text style={evalStyles.dateArrow}>›</Text>
                  </TouchableOpacity>
                )}
                {!isWeb && showDatePicker && (
                  <DateTimePicker
                    value={watchedDate || new Date()}
                    mode="date"
                    display={isIOS ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                  />
                )}
              </View>

              {/* SALVAR */}
              <TouchableOpacity
                style={[evalStyles.saveButton, isAndroid && evalStyles.androidSaveButton, isIOS && evalStyles.iosSaveButton]}
                onPress={saveReview}
                activeOpacity={0.8}
              >
                <Text style={evalStyles.saveButtonText}>SALVAR AVALIAÇÃO</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ====================================================
  // RENDERIZAÇÃO: TELA DE LOGIN (PRINCIPAL)
  // ====================================================
  if (tela === 'login') {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#B80000" />
        <View style={styles.logoContainer}>
          <Text style={styles.titleWorld}>World</Text>
          <Text style={styles.titleSub}>of Movie</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.labelLogin}>Login:</Text>
          <TextInput style={styles.loginInput} placeholder="Email ou Telefone (ex: admin)" placeholderTextColor="#4A3B00" value={login} onChangeText={setLogin} autoCapitalize="none" />
          <TextInput style={styles.loginInput} placeholder="Senha (ex: 123456)" placeholderTextColor="#4A3B00" secureTextEntry value={senha} onChangeText={setSenha} />
          {mensagemGlobal !== '' && <Text style={styles.erroText}>{mensagemGlobal}</Text>}
          <TouchableOpacity style={styles.forgotPassword} onPress={() => { setTela('recuperar'); setMensagemGlobal(''); }}>
            <Text style={styles.forgotText}>Esqueceu a senha</Text>
          </TouchableOpacity>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setLembrar(!lembrar)} activeOpacity={0.8}>
              <View style={[styles.checkbox, lembrar && styles.checkboxChecked]} />
              <Text style={styles.checkboxLabel}>Lembra usuário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonEntrar} onPress={validarLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={() => { setTela('cadastro_conta'); setMensagemGlobal(''); }}>
            <Text style={styles.registerText}>Não tem conta? Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ====================================================
  // RENDERIZAÇÃO: TELA PRINCIPAL DE FILMES (HOME)
  // ====================================================
  return (
    <SafeAreaView style={movieStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#800000" />
      <ScrollView contentContainerStyle={movieStyles.scrollContent}>
        
        {/* Header / Busca */}
        <View style={movieStyles.headerContainer}>
          <Pressable style={movieStyles.menuButton} onPress={fazerLogout}>
            <Ionicons name="log-out-outline" size={28} color="#E5A93C" />
          </Pressable>

          <View style={movieStyles.searchBarContainer}>
            <Ionicons name="search" size={20} color="#666" style={movieStyles.searchIcon} />
            <TextInput
              style={movieStyles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Pesquisar..."
              placeholderTextColor="#999"
              returnKeyType="search"
            />
          </View>
        </View>

        {/* Principais Resultados */}
        <View style={movieStyles.sectionContainer}>
          <Text style={movieStyles.sectionTitleMain}>Principais Resultados</Text>
          <Text style={movieStyles.movieTitleMain}>No Game No Life: Zero</Text>
          
          <View style={movieStyles.ratingRow}>
            <Text style={movieStyles.ratingText}>8/10 </Text>
            <Text style={movieStyles.stars}>★★★★★</Text>
          </View>

          <View style={movieStyles.mainBannerWrapper}>
            <HoverableMovieCard
              isMain={true}
              image="https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MDM3LTk3ZDUtMTI1N2FiYmFlM2JhXkEyXkFqcGc@._V1_.jpg"
            />
          </View>

          <View style={movieStyles.mainDetailsRow}>
            <View style={movieStyles.genreInfoContainer}>
              <Text style={movieStyles.genreText}>Fantasia/Drama/Romance/Ação/Anime</Text>
              <Text style={movieStyles.studioText}>Atsuku Ishizuka | Madhouse</Text>
            </View>

            <Pressable
              style={[
                movieStyles.favoriteButton,
                isFavorited && movieStyles.favoriteActiveButton,
              ]}
              onPress={() => setIsFavorited(!isFavorited)}
            >
              <Text style={movieStyles.favoriteText}>
                {isFavorited ? 'Favoritado' : 'Favoritar'}
              </Text>
              <Ionicons
                name={isFavorited ? 'heart' : 'heart-outline'}
                size={18}
                color={isFavorited ? '#D32F2F' : '#333'}
                style={{ marginLeft: 4 }}
              />
            </Pressable>
          </View>
        </View>

        <View style={movieStyles.divider} />

        {/* Títulos Semelhantes */}
        <View style={movieStyles.sectionContainer}>
          <Text style={movieStyles.sectionTitleSub}>Títulos Semelhantes</Text>

          <View style={movieStyles.gridContainer}>
            {SIMILAR_MOVIES.map((item) => (
              <View key={item.id} style={movieStyles.gridItem}>
                <View style={movieStyles.cardBorderWrapper}>
                  <HoverableMovieCard image={item.image} title={item.title} />
                </View>
                <View style={movieStyles.movieLabelBadge}>
                  <Text style={movieStyles.movieLabelText} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* BARRA DE NAVEGAÇÃO INFERIOR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setTela('home')}>
          <MaterialCommunityIcons name="movie-open-outline" size={28} color="#aaa" />
          <Text style={styles.navText}>Filmes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setTela('avaliar_filme')}>
          <View style={styles.navItemActive}>
            <Ionicons name="star" size={24} color="#000" />
          </View>
          <Text style={styles.navText}>Avaliar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => setTela('cadastro_conta')}>
          <Ionicons name="person-circle-outline" size={30} color="#aaa" />
          <Text style={styles.navText}>Conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ====================================================
// ESTILOS GLOBAIS E DE NAVEGAÇÃO
// ====================================================
const styles = StyleSheet.create({
  loginContainer: { flex: 1, backgroundColor: '#B80000', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  titleWorld: { fontSize: 56, fontWeight: '900', color: '#111111', letterSpacing: 1 },
  titleSub: { fontSize: 28, color: '#111111', marginTop: -8 },
  formContainer: { width: '100%', maxWidth: 320 },
  labelLogin: { color: '#111111', fontSize: 18, marginBottom: 8, marginLeft: 12 },
  loginInput: { backgroundColor: '#DDA835', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 20, fontSize: 16, color: '#111111', marginBottom: 20 },
  erroText: { color: '#fff', fontWeight: 'bold', marginLeft: 12, marginBottom: 10, marginTop: -10 },
  forgotPassword: { alignSelf: 'flex-start', marginLeft: 12, marginTop: -10, marginBottom: 16 },
  forgotText: { color: '#111111', fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline' },
  backToLoginButton: { alignItems: 'center', marginTop: 25 },
  actionsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 16, height: 16, borderWidth: 1.5, borderColor: '#111111', marginRight: 6 },
  checkboxChecked: { backgroundColor: '#111111' },
  checkboxLabel: { color: '#111111', fontSize: 12 },
  buttonEntrar: { backgroundColor: '#DDA835', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20 },
  buttonText: { color: '#111111', fontSize: 16, fontWeight: 'bold' },
  registerButton: { marginTop: 30, alignItems: 'center', paddingVertical: 10 },
  registerText: { color: '#fff', fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline' },

  formScreenContainer: { flex: 1, backgroundColor: '#A60303' },
  scrollForm: { padding: 25, flexGrow: 1, justifyContent: 'center' },
  formTitulo: { fontSize: 30, fontWeight: 'bold', color: '#12100F', textAlign: 'center', marginBottom: 5 },
  formSubtitulo: { fontSize: 16, color: '#12100F', textAlign: 'center', marginBottom: 30 },
  formLabel: { fontSize: 16, color: '#12100F', marginBottom: 5 },
  formInput: { height: 50, borderWidth: 2, borderColor: '#D4AF37', borderRadius: 8, backgroundColor: '#D4AF37', paddingHorizontal: 15, marginBottom: 15, color: '#12100F' },
  formCheckboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 25 },
  formCheckbox: { width: 25, height: 25, borderWidth: 2, borderColor: '#D4AF37', backgroundColor: '#D4AF37', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  formCheck: { color: '#12100F', fontSize: 18, fontWeight: 'bold' },
  formTextoCheckbox: { color: '#12100F', fontSize: 15 },
  formBotao: { backgroundColor: '#D4AF37', height: 50, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  formTextoBotao: { color: '#12100F', fontSize: 18, fontWeight: 'bold' },
  formMensagem: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },

  aboutContainer: { flex: 1, backgroundColor: aboutColors.pageBg },
  aboutScrollContainer: { flexGrow: 1, paddingVertical: 16, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' },
  aboutScreen: { width: '100%', maxWidth: 600, flex: 1, backgroundColor: aboutColors.bgDark, borderRadius: 12, overflow: 'hidden', position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 8 },
  aboutDecorativeDot: { position: 'absolute', top: 14, left: 14, width: 10, height: 10, backgroundColor: aboutColors.gold, borderRadius: 5, opacity: 0.9, zIndex: 1 },
  aboutHeader: { paddingTop: 36, paddingHorizontal: 28, paddingBottom: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  aboutClapperBadge: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#d94a4a', justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  aboutEmojiIcon: { fontSize: 24 },
  aboutTitleBlock: { flex: 1 },
  aboutTitle: { fontWeight: '900', color: aboutColors.white, fontSize: 36, lineHeight: 38, letterSpacing: 0.5 },
  aboutAccent: { color: aboutColors.gold },
  aboutSubtitleContainer: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: aboutColors.line },
  aboutSubtitle: { color: aboutColors.creamDim, fontSize: 14, fontWeight: '400', letterSpacing: 0.3 },
  aboutContent: { paddingHorizontal: 28, paddingBottom: 36, gap: 22, flex: 1, justifyContent: 'space-between' },
  aboutSectionLabel: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  aboutIcon: { fontSize: 18 },
  aboutSectionTitle: { color: aboutColors.white, fontSize: 18, fontWeight: 'bold' },
  aboutObjetivoCard: { backgroundColor: aboutColors.cardRed, borderLeftWidth: 4, borderLeftColor: aboutColors.gold, borderRadius: 6, paddingVertical: 18, paddingHorizontal: 20 },
  aboutObjetivoText: { color: aboutColors.cream, fontSize: 13, lineHeight: 20, fontStyle: 'italic' },
  aboutFuncionalidades: { width: '100%' },
  aboutGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  aboutFeatureCard: { backgroundColor: aboutColors.cardRed, borderRadius: 8, paddingVertical: 18, paddingHorizontal: 16 },
  aboutFeatureIcon: { fontSize: 22, marginBottom: 8 },
  aboutFeatureTitle: { color: aboutColors.white, fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  aboutHighlight: { color: aboutColors.goldSoft },
  aboutFeatureText: { color: aboutColors.creamDim, fontSize: 12, lineHeight: 18 },
  aboutSobreCard: { backgroundColor: aboutColors.cardRed, borderRadius: 8, padding: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  aboutSobreIcon: { fontSize: 24, marginTop: 2 },
  aboutSobreContent: { flex: 1 },
  aboutSobreTitle: { color: aboutColors.white, fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  aboutSobreText: { color: aboutColors.creamDim, fontSize: 13, lineHeight: 19 },
  aboutBtnContinuar: { backgroundColor: aboutColors.gold, paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  aboutBtnContinuarText: { color: aboutColors.bgDark, fontSize: 16, fontWeight: 'bold' },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: '#1a0404', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#000', zIndex: 10 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navItemActive: { backgroundColor: '#FFD700', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 2 },
  navText: { color: '#FFF', fontSize: 10, marginTop: 2 }
});

// ====================================================
// ESTILOS DA TELA DE HOME (CATÁLOGO DE FILMES)
// ====================================================
const movieStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#800000' },
  scrollContent: { padding: 16, paddingBottom: 90 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  menuButton: { marginRight: 12 },
  searchBarContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 12, height: 40 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#333', fontWeight: '500' },
  sectionContainer: { marginBottom: 10 },
  sectionTitleMain: { color: '#FF5555', fontSize: 18, fontWeight: 'bold' },
  movieTitleMain: { color: '#FF4444', fontSize: 16, fontWeight: '600', marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  ratingText: { color: '#E5A93C', fontSize: 14, fontWeight: 'bold' },
  stars: { color: '#FFD700', fontSize: 14 },
  mainBannerWrapper: { width: '100%', height: 230, borderRadius: 8, overflow: 'hidden', borderWidth: 2, borderColor: '#E5A93C' },
  mainImageContainer: { width: '100%', height: '100%' },
  mainPosterImage: { width: '100%', height: '100%' },
  mainDetailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 },
  genreInfoContainer: { flex: 1 },
  genreText: { color: '#D87A7A', fontSize: 12 },
  studioText: { color: '#B05555', fontSize: 12 },
  favoriteButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5E6A3', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  favoriteActiveButton: { backgroundColor: '#FFF0F0' },
  favoriteText: { color: '#333', fontSize: 13, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#991111', marginVertical: 16 },
  sectionTitleSub: { color: '#FF6666', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '31%', marginBottom: 16, alignItems: 'center' },
  cardBorderWrapper: { width: '100%', height: 140, borderRadius: 8, overflow: 'hidden', borderWidth: 2, borderColor: '#E5A93C' },
  cardContainer: { width: '100%', height: '100%' },
  cardImage: { width: '100%', height: '100%' },
  movieLabelBadge: { backgroundColor: '#991111', width: '100%', paddingVertical: 4, paddingHorizontal: 2, borderRadius: 4, marginTop: 6, alignItems: 'center' },
  movieLabelText: { color: '#FF6666', fontSize: 10, fontWeight: '600', textAlign: 'center' },
});

// ====================================================
// ESTILOS DA TELA DE AVALIAÇÃO DETALHADA
// ====================================================
const evalStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: EVAL_COLORS.DARK },
  webSafeArea: { alignItems: 'center', justifyContent: 'center' },
  keyboard: { flex: 1, width: '100%', alignItems: 'center' },
  phone: { flex: 1, width: '100%', backgroundColor: EVAL_COLORS.RED, borderWidth: 2, borderColor: EVAL_COLORS.YELLOW, overflow: 'hidden' },
  webPhone: { width: '100%', maxWidth: 500, minHeight: '100%' },
  tabletPhone: { maxWidth: 600 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backIcon: { color: EVAL_COLORS.YELLOW, fontSize: 32, fontWeight: 'bold' },
  topbarTitle: { color: EVAL_COLORS.WHITE, fontSize: 18, fontWeight: 'bold' },
  topbarSpacer: { width: 36 },
  scroll: { flex: 1 },
  content: { gap: 12 },
  movieHeader: { flexDirection: 'row', backgroundColor: EVAL_COLORS.DARK, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: EVAL_COLORS.YELLOW, alignItems: 'center', gap: 12 },
  poster: { borderRadius: 6, borderWidth: 1, borderColor: EVAL_COLORS.YELLOW },
  movieInfo: { flex: 1, justifyContent: 'center' },
  movieTitle: { color: EVAL_COLORS.WHITE, fontWeight: 'bold', marginBottom: 2 },
  movieMeta: { color: EVAL_COLORS.YELLOW, marginBottom: 2 },
  movieGenre: { color: EVAL_COLORS.WHITE, opacity: 0.8, marginBottom: 2 },
  movieDirector: { color: EVAL_COLORS.WHITE, opacity: 0.8 },
  card: { backgroundColor: EVAL_COLORS.DARK, borderRadius: 10, borderWidth: 1, borderColor: EVAL_COLORS.YELLOW },
  cardTitle: { color: EVAL_COLORS.YELLOW, fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  starsContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  starButton: { padding: 2 },
  star: { fontWeight: 'bold' },
  starYellow: { color: EVAL_COLORS.YELLOW },
  starWhite: { color: EVAL_COLORS.WHITE, opacity: 0.3 },
  ratingNumber: { flexDirection: 'row', alignItems: 'baseline' },
  ratingValue: { color: EVAL_COLORS.WHITE, fontSize: 22, fontWeight: 'bold' },
  ratingTotal: { color: EVAL_COLORS.YELLOW, fontSize: 12 },
  ratingDescription: { color: EVAL_COLORS.WHITE, fontSize: 11, opacity: 0.8, marginTop: 6, fontStyle: 'italic' },
  savedOpinion: { color: EVAL_COLORS.WHITE, fontSize: 13, lineHeight: 18, marginBottom: 10 },
  opinionButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  editButton: { backgroundColor: EVAL_COLORS.YELLOW, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  editText: { color: EVAL_COLORS.DARK, fontWeight: 'bold', fontSize: 12 },
  deleteButton: { backgroundColor: '#B22222', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  deleteText: { color: EVAL_COLORS.WHITE, fontWeight: 'bold', fontSize: 12 },
  textareaContainer: { backgroundColor: EVAL_COLORS.DARK, borderWidth: 1, borderColor: EVAL_COLORS.YELLOW, borderRadius: 8, padding: 8, minHeight: 90, marginBottom: 8 },
  textarea: { color: EVAL_COLORS.WHITE, fontSize: 13, flex: 1, minHeight: 70 },
  characterCount: { color: EVAL_COLORS.WHITE, fontSize: 10, opacity: 0.6, alignSelf: 'flex-end' },
  sendButton: { backgroundColor: EVAL_COLORS.YELLOW, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  sendButtonText: { color: EVAL_COLORS.DARK, fontWeight: 'bold', fontSize: 13 },
  favoriteRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  favoriteTextTitle: { color: EVAL_COLORS.YELLOW, fontWeight: 'bold', letterSpacing: 1 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
  tag: { flexDirection: 'row', alignItems: 'center', backgroundColor: EVAL_COLORS.RED, borderWidth: 1, borderColor: EVAL_COLORS.YELLOW, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  tagText: { color: EVAL_COLORS.WHITE, fontSize: 11 },
  tagRemove: { color: EVAL_COLORS.YELLOW, fontSize: 13, fontWeight: 'bold' },
  addTagButton: { width: 26, height: 26, borderRadius: 13, backgroundColor: EVAL_COLORS.YELLOW, alignItems: 'center', justifyContent: 'center' },
  addTagPlus: { color: EVAL_COLORS.DARK, fontSize: 16, fontWeight: 'bold' },
  tagInputRow: { flexDirection: 'row', marginTop: 10, gap: 8 },
  tagInput: { flex: 1, height: 36, backgroundColor: EVAL_COLORS.RED, borderWidth: 1, borderColor: EVAL_COLORS.YELLOW, borderRadius: 6, color: EVAL_COLORS.WHITE, paddingHorizontal: 8, fontSize: 12 },
  tagConfirmButton: { width: 36, height: 36, backgroundColor: EVAL_COLORS.YELLOW, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  tagConfirmText: { color: EVAL_COLORS.DARK, fontWeight: 'bold', fontSize: 16 },
  webDateContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: EVAL_COLORS.DARK, borderRadius: 8, borderWidth: 1, borderColor: EVAL_COLORS.YELLOW, paddingHorizontal: 10, paddingVertical: 6 },
  calendarIcon: { fontSize: 16, marginRight: 8 },
  datePlaceholder: { flexDirection: 'row', alignItems: 'center', backgroundColor: EVAL_COLORS.DARK, borderRadius: 8, borderWidth: 1, borderColor: EVAL_COLORS.YELLOW, paddingHorizontal: 12, paddingVertical: 10 },
  datePlaceholderText: { flex: 1, color: EVAL_COLORS.WHITE, fontSize: 12 },
  dateArrow: { color: EVAL_COLORS.YELLOW, fontSize: 18, fontWeight: 'bold' },
  saveButton: { backgroundColor: EVAL_COLORS.YELLOW, borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 4, marginBottom: 10 },
  androidSaveButton: {},
  iosSaveButton: {},
  saveButtonText: { color: EVAL_COLORS.DARK, fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
});