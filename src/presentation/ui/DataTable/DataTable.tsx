import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';

type Props = {
  title: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  /** Index of the row to emphasize (the one used in a calculation). */
  highlightedRow?: number;
  note?: string;
  /** Opens the table full screen; the hint is shown only when set. */
  onPress?: () => void;
  hint?: string;
};

const COLUMN_MIN_WIDTH = 76;

/** A small data table that scrolls sideways when it is wider than the screen. */
export function DataTable({
  title,
  columns,
  rows,
  highlightedRow,
  note,
  onPress,
  hint,
}: Props) {
  // The whole block opens the table. On iOS the sideways ScrollView keeps the touches on the
  // table body for itself, so the body gets its own Pressable inside the scroll content.
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      disabled={onPress === undefined}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={hint ? `${title}. ${hint}` : title}
    >
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <Pressable
          onPress={onPress}
          disabled={onPress === undefined}
          accessible={false}
          style={[
            styles.table,
            { minWidth: columns.length * COLUMN_MIN_WIDTH },
          ]}
        >
          <View style={[styles.row, styles.header]}>
            {columns.map(column => (
              <Text key={column} style={[styles.cell, styles.headerText]}>
                {column}
              </Text>
            ))}
          </View>
          {rows.map((row, index) => {
            const highlighted = index === highlightedRow;
            return (
              <View
                key={index}
                testID={highlighted ? 'linha-destaque' : undefined}
                style={[styles.row, highlighted && styles.highlighted]}
              >
                {row.map((cell, column) => (
                  <Text
                    key={column}
                    style={[styles.cell, highlighted && styles.highlightedText]}
                  >
                    {cell}
                  </Text>
                ))}
              </View>
            );
          })}
        </Pressable>
      </ScrollView>
      {note !== undefined && <Text style={styles.note}>{note}</Text>}
      {onPress !== undefined && hint !== undefined && (
        <Text style={styles.hint}>{hint}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    color: colors.textStrong,
    marginBottom: spacing.sm,
  },
  scroll: {
    flexGrow: 1,
  },
  table: {
    flexGrow: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderSubtle,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
  },
  header: {
    borderTopWidth: 0,
    backgroundColor: colors.surface,
  },
  cell: {
    flex: 1,
    minWidth: COLUMN_MIN_WIDTH,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    fontSize: 14,
    lineHeight: 18,
    color: colors.text,
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    color: colors.textStrong,
  },
  highlighted: {
    backgroundColor: colors.headerBackground,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  note: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
});
