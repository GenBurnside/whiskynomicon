class RenameVariantType < ActiveRecord::Migration
  def change
    rename_column :variants, :type, :style
  end
end
