import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ScreenProps } from '../../navigation/routes';
import { colors, spacing } from '../../theme';
import { HomeHeader } from './HomeHeader';
import { homeOptions } from './homeOptions';
import { OptionCard } from './OptionCard';

const COLUMNS = 2;

export function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing.md * 2 * COLUMNS) / COLUMNS;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FlatList
        data={homeOptions}
        numColumns={COLUMNS}
        keyExtractor={option => option.route}
        ListHeaderComponent={HomeHeader}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <OptionCard
            label={item.label}
            image={item.image}
            width={cardWidth}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
  },
});
